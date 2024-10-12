import React from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'

const HomePage: React.FC = () => {
  return (
    // <Layout>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-primary-dark">Welcome to EcoSphere</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Your hub for sustainable living and community engagement
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Resource Sharing</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Link href="/marketplace" className="text-primary hover:text-primary-dark">
                  Visit our marketplace
                </Link> to share and borrow items in your community.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Waste Reduction</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Learn how to reduce waste and find local recycling centers in the{' '}
                <Link href="/wastereduction" className="text-primary hover:text-primary-dark">
                  waste reduction section
                </Link>.
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Energy Dashboard</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Monitor your energy usage and get personalized recommendations in the{' '}
                <Link href="/dashboard" className="text-primary hover:text-primary-dark">
                  energy dashboard
                </Link>.
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Community Engagement</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Join discussions, find events, and volunteer opportunities in our{' '}
                <Link href="/community" className="text-primary hover:text-primary-dark">
                  community section
                </Link>.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    // </Layout>
  )
}

export default HomePage