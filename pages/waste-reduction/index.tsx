import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Layout from '../../components/layout/Layout'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface RecyclingCenter {
  id: number
  name: string
  address: string
  materials: string[]
}

const fetchRecyclingCenters = async (): Promise<RecyclingCenter[]> => {
  // In a real application, this would be an API call
  return [
    { id: 1, name: 'Green Recycling Co.', address: '123 Eco St, Green City', materials: ['Paper', 'Plastic', 'Glass'] },
    { id: 2, name: 'City Recycling Center', address: '456 Earth Ave, Green City', materials: ['Electronics', 'Metal', 'Batteries'] },
    { id: 3, name: 'Green Recycling Co.', address: '123 Eco St, Green City', materials: ['Paper', 'Plastic', 'Glass'] },
    { id: 4, name: 'City Recycling Center', address: '456 Earth Ave, Green City', materials: ['Electronics', 'Metal', 'Batteries'] },
  ]
}

const WasteReductionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: recyclingCenters, isLoading, error } = useQuery('recyclingCenters', fetchRecyclingCenters)

  const filteredCenters = recyclingCenters?.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.materials.some(material => material.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (isLoading) return <Layout><div className="text-center">Loading...</div></Layout>
  if (error) return <Layout><div className="text-center text-red-500">Error loading recycling centers</div></Layout>

  return (
    // <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-6">Waste Reduction</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-primary-dark">Recycling Center Locator</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Find recycling centers near you</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by name, address, or materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ul className="divide-y divide-gray-200">
            {filteredCenters?.map((center) => (
              <li key={center.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary-dark truncate">{center.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    {center.materials.map((material, index) => (
                      <span key={index} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {center.address}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-primary-dark">Waste Reduction Tips</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Simple ways to reduce waste in your daily life</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <ul className="list-disc pl-5 space-y-2">
              <li>Use reusable shopping bags</li>
              <li>Opt for products with minimal packaging</li>
              <li>Compost food scraps and yard waste</li>
              <li>Use a refillable water bottle</li>
              <li>Repair items instead of replacing them</li>
            </ul>
          </div>
        </div>
      </div>
    // </Layout>
  )
}

export default WasteReductionPage