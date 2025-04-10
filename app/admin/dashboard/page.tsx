"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainLayout } from "@/components/main-layout"
import { getAdminDashboardStats } from "@/lib/api"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const data = await getAdminDashboardStats()
        setStats(data)
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your charter business</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Aircraft"
            value={stats.totalAircraft}
            description="Available in fleet"
            trend={stats.aircraftTrend}
          />
          <StatCard
            title="Total Requests"
            value={stats.totalRequests}
            description="Charter requests"
            trend={stats.requestsTrend}
          />
          <StatCard
            title="Active Bookings"
            value={stats.activeBookings}
            description="Currently in use"
            trend={stats.bookingsTrend}
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            description="Year to date"
            trend={stats.revenueTrend}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue for the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Request Status</CardTitle>
              <CardDescription>Breakdown of request statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  accepted: {
                    label: "Accepted",
                    color: "hsl(var(--success))",
                  },
                  pending: {
                    label: "Pending",
                    color: "hsl(var(--warning))",
                  },
                  declined: {
                    label: "Declined",
                    color: "hsl(var(--destructive))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.requestStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="accepted" fill="var(--color-accepted)" />
                    <Bar dataKey="pending" fill="var(--color-pending)" />
                    <Bar dataKey="declined" fill="var(--color-declined)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Popular Aircraft</CardTitle>
            <CardDescription>Top 10 most requested aircraft</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-2 text-left font-medium">Rank</th>
                    <th className="p-2 text-left font-medium">Model</th>
                    <th className="p-2 text-left font-medium">Category</th>
                    <th className="p-2 text-left font-medium">Requests</th>
                    <th className="p-2 text-left font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.popularAircraft.map((aircraft, index) => (
                    <tr key={aircraft.id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2 font-medium">{aircraft.model}</td>
                      <td className="p-2">{aircraft.category}</td>
                      <td className="p-2">{aircraft.requests}</td>
                      <td className="p-2">${aircraft.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

function StatCard({ title, value, description, trend }) {
  const isPositive = trend > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className={`text-xs mt-1 ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? "↑" : "↓"} {Math.abs(trend)}% from last month
        </div>
      </CardContent>
    </Card>
  )
}
