import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Layout from '../../components/layout/Layout'
import { Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface Item {
    id: number
    name: string
    description: string
    owner: string
    image: string
}

const fetchItems = async (): Promise<Item[]> => {
    // In a real application, this would be an API call
    return [
        { id: 1, name: 'Lawn Mower', description: 'Electric lawn mower, barely used', owner: 'John Doe', image: 'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 2, name: 'Bicycle', description: 'Mountain bike, great condition', owner: 'Jane Smith', image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: 3, name: 'Lawn Mower', description: 'Electric lawn mower, barely used', owner: 'John Doe', image: 'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 4, name: 'Bicycle', description: 'Mountain bike, great condition', owner: 'Jane Smith', image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { id: 5, name: 'Lawn Mower', description: 'Electric lawn mower, barely used', owner: 'John Doe', image: 'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 6, name: 'Bicycle', description: 'Mountain bike, great condition', owner: 'Jane Smith', image: 'https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=800' },
    ]
}

const MarketplacePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<Item | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const { data: items, isLoading, error } = useQuery('items', fetchItems)

    const filteredItems = items?.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const openModal = (item: Item) => {
        setSelectedItem(item)
        setIsModalOpen(true)
    }

    if (isLoading) return <Layout><div className="text-center">Loading...</div></Layout>
    if (error) return <Layout><div className="text-center text-red-500">Error loading items</div></Layout>

    return (
        // <Layout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-primary-dark mb-6">Marketplace</h1>

                <div className="mb-6">
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            type="text"
                            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                            placeholder="Search items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems?.map((item) => (
                        <div key={item.id} className="bg-white overflow-hidden shadow rounded-lg">
                            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-primary-dark">{item.name}</h2>
                                <p className="text-gray-600 mt-2">{item.description}</p>
                                <button
                                    onClick={() => openModal(item)}
                                    className="mt-4 bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <Transition show={isModalOpen} as={React.Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={() => setIsModalOpen(false)}
                    >
                        <div className="min-h-screen px-4 text-center">
                            {/* Manually adding backdrop */}
                            <div className="fixed inset-0 bg-black opacity-30"></div>

                            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-primary-dark">
                                    {selectedItem?.name}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{selectedItem?.description}</p>
                                    <p className="text-sm text-gray-500 mt-2">Owner: {selectedItem?.owner}</p>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-secondary-dark rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

            </div>
        // </Layout>
    )
}

export default MarketplacePage