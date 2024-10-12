import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import Layout from '../../components/layout/Layout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useWebSocket from '../../hooks/useWebSocket'

interface EnergyData {
  date: string
  usage: number
}

interface Recommendation {
  id: number
  title: string
  description: string
  potentialSavings: number
}

interface CommunityProgress {
  totalUsers: number
  totalEnergySaved: number
  topSaver: string
}

const fetchEnergyData = async (): Promise<EnergyData[]> => {
  // In a real application, this would be an API call
  return [
    { date: '2023-01', usage: 300 },
    { date: '2023-02', usage: 280 },
    { date: '2023-03', usage: 250 },
    { date: '2023-04', usage: 220 },
    { date: '2023-05', usage: 200 },
    { date: '2023-06', usage: 180 },
  ]
}

const fetchRecommendations = async (): Promise<Recommendation[]> => {
  // In a real application, this would be an API call
  return [
    { id: 1, title: 'Switch to LED bulbs', description: 'Replace your old incandescent bulbs with energy-efficient LED bulbs.', potentialSavings: 75 },
    { id: 2, title: 'Upgrade to a smart thermostat', description: 'Install a smart thermostat to automatically adjust your home temperature.', potentialSavings: 120 },
    { id: 3, title: 'Seal air leaks', description: 'Check for and seal air leaks around windows and doors to improve insulation.', potentialSavings: 90 },
  ]
}

const fetchCommunityProgress = async (): Promise<CommunityProgress> => {
  // In a real application, this would be an API call
  return {
    totalUsers: 1500,
    totalEnergySaved: 75000,
    topSaver: 'Jane Smith'
  }
}

const EnergyDashboardPage: React.FC = () => {
  const { data: energyData, isLoading: isLoadingEnergy, error: energyError } = useQuery('energyData', fetchEnergyData)
  const { data: recommendations, isLoading: isLoadingRecommendations, error: recommendationsError } = useQuery('recommendations', fetchRecommendations)
  const { data: communityProgress, isLoading: isLoadingCommunity, error: communityError } = useQuery('communityProgress', fetchCommunityProgress)

  if (isLoadingEnergy || isLoadingRecommendations || isLoadingCommunity) return <Layout><div className="text-center">Loading...</div></Layout>
  if (energyError || recommendationsError || communityError) return <Layout><div className="text-center text-red-500">Error loading data</div></Layout>

  return (
    // <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-6">Energy Dashboard</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-primary-dark">Energy Usage Overview</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your monthly energy consumption</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#2563EB" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-primary-dark">Energy-Saving Recommendations</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personalized tips to reduce your energy consumption</p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {recommendations?.map((recommendation) => (
                <li key={recommendation.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-primary-dark">{recommendation.title}</p>
                    <p className="text-sm text-secondary-dark">Potential savings: ${recommendation.potentialSavings}/year</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{recommendation.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl font-semibold text-primary-dark">Community Progress</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">See how our community is making a difference</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Total Users</dt>
                <dd className="mt-1 text-sm text-primary-dark">{communityProgress?.totalUsers}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Total Energy Saved</dt>
                <dd className="mt-1 text-sm text-primary-dark">{communityProgress?.totalEnergySaved} kWh</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Top Energy Saver</dt>
                <dd className="mt-1 text-sm text-primary-dark">{communityProgress?.topSaver}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    // </Layout>
  )
}

export default EnergyDashboardPage