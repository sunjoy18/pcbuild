'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout'
import { PartSelector } from '@/components/part-selector'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const MOCK_OPTIONS = {
  chipset: ['AMD', 'Intel'],
  cases: ['H5 Flow', 'H7 Flow', 'H9 Flow'],
  motherboards: ['ROG STRIX', 'MPG', 'AORUS'],
  gpu: ['RTX 4090', 'RTX 4080', 'RX 7900 XTX'],
  cpu: ['i9-13900K', 'i7-13700K', 'R9 7950X'],
  powerSupplies: ['850W', '1000W', '1200W'],
  ram: ['32GB DDR5', '64GB DDR5', '128GB DDR5'],
}

export default function BuilderPage() {
  const [config, setConfig] = useState({
    chipset: '',
    case: '',
    motherboard: '',
    gpu: '',
    cpu: '',
    powerSupply: '',
    ram: '',
  })

  const [activeTab, setActiveTab] = useState('base')

  const updateConfig = (key: keyof typeof config) => (value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Build</h1>
          <div className="flex space-x-4">
            <Button variant="outline">Restart</Button>
            <Button variant="outline">Share</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="bg-accent/10 rounded-lg p-8 flex items-center justify-center min-h-[600px]">
            <p className="text-lg text-muted-foreground">PC Preview</p>
          </div>

          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="base">Base</TabsTrigger>
                <TabsTrigger value="addons">Add-ons</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              <TabsContent value="base">
                <div className="space-y-4">
                  <PartSelector
                    title="Chipset"
                    options={MOCK_OPTIONS.chipset}
                    value={config.chipset}
                    onChange={updateConfig('chipset')}
                    helpText="Choose your preferred platform"
                  />
                  <PartSelector
                    title="Case"
                    options={MOCK_OPTIONS.cases}
                    value={config.case}
                    onChange={updateConfig('case')}
                  />
                  <PartSelector
                    title="Motherboard"
                    options={MOCK_OPTIONS.motherboards}
                    value={config.motherboard}
                    onChange={updateConfig('motherboard')}
                  />
                  <PartSelector
                    title="GPU"
                    options={MOCK_OPTIONS.gpu}
                    value={config.gpu}
                    onChange={updateConfig('gpu')}
                  />
                  <PartSelector
                    title="CPU"
                    options={MOCK_OPTIONS.cpu}
                    value={config.cpu}
                    onChange={updateConfig('cpu')}
                  />
                  <PartSelector
                    title="Power Supply"
                    options={MOCK_OPTIONS.powerSupplies}
                    value={config.powerSupply}
                    onChange={updateConfig('powerSupply')}
                  />
                  <PartSelector
                    title="RAM"
                    options={MOCK_OPTIONS.ram}
                    value={config.ram}
                    onChange={updateConfig('ram')}
                  />
                </div>
              </TabsContent>
              <TabsContent value="addons">
                <div className="p-4 text-center text-muted-foreground">
                  Additional components and accessories
                </div>
              </TabsContent>
              <TabsContent value="summary">
                <div className="p-4 text-center text-muted-foreground">
                  Build summary and final price
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Estimated Ship Date: {new Date().toLocaleDateString()}
              </div>
              <Button size="lg">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

