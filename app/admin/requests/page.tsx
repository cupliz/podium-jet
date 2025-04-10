"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, Clock, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockRequests = [
  {
    id: "req-1",
    status: "accepted",
    user: "John Doe",
    email: "john@example.com",
    from: "New York (JFK)",
    to: "Miami (MIA)",
    date: "June 15, 2023",
    aircraft: "Gulfstream G650",
    price: 25000,
    message: "Need catering for 4 people.",
    responseMessage: "Your request has been accepted. Please confirm your booking within 24 hours.",
  },
  {
    id: "req-2",
    status: "declined",
    user: "Jane Smith",
    email: "jane@example.com",
    from: "Los Angeles (LAX)",
    to: "Las Vegas (LAS)",
    date: "May 28, 2023",
    aircraft: "Cessna Citation X",
    price: 12000,
    message: "Early morning departure preferred.",
    responseMessage:
      "We regret to inform you that your request cannot be accommodated due to aircraft unavailability on the requested date.",
  },
  {
    id: "req-3",
    status: "pending",
    user: "Robert Johnson",
    email: "robert@example.com",
    from: "Chicago (ORD)",
    to: "Toronto (YYZ)",
    date: "July 10, 2023",
    aircraft: "Bombardier Challenger 350",
    price: 18000,
    message: "Need wheelchair accessibility.",
    responseMessage: "",
  },
  {
    id: "req-4",
    status: "pending",
    user: "Sarah Williams",
    email: "sarah@example.com",
    from: "London (LHR)",
    to: "Paris (CDG)",
    date: "July 15, 2023",
    aircraft: "Embraer Praetor 600",
    price: 15000,
    message: "Business meeting, need reliable internet.",
    responseMessage: "",
  },
  {
    id: "req-5",
    status: "pending",
    user: "Michael Brown",
    email: "michael@example.com",
    from: "San Francisco (SFO)",
    to: "Seattle (SEA)",
    date: "July 20, 2023",
    aircraft: "Pilatus PC-24",
    price: 10000,
    message: "Family trip with 2 children.",
    responseMessage: "",
  },
]

export default function AdminRequestsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogAction, setDialogAction] = useState<"accept" | "decline">("accept")
  const { toast } = useToast()

  const filteredRequests = mockRequests
    .filter((request) => activeTab === "all" || request.status === activeTab)
    .filter(
      (request) =>
        request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.aircraft.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleOpenDialog = (request: any, action: "accept" | "decline") => {
    setSelectedRequest(request)
    setDialogAction(action)
    setResponseMessage(request.responseMessage || "")
    setDialogOpen(true)
  }

  const handleSubmitResponse = () => {
    // In a real app, you would update the request in your backend
    toast({
      title: `Request ${dialogAction === "accept" ? "accepted" : "declined"}`,
      description: `The request from ${selectedRequest.user} has been ${dialogAction === "accept" ? "accepted" : "declined"}.`,
    })
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Requests</h1>
        <p className="text-muted-foreground">Review and respond to charter requests from users</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Charter Requests</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search requests..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Aircraft</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="font-medium">{request.user}</div>
                          <div className="text-sm text-muted-foreground">{request.email}</div>
                        </TableCell>
                        <TableCell>
                          {request.from} to {request.to}
                        </TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>{request.aircraft}</TableCell>
                        <TableCell>${request.price.toLocaleString()}</TableCell>
                        <TableCell>
                          {request.status === "accepted" && <Badge className="bg-green-500">Accepted</Badge>}
                          {request.status === "declined" && <Badge variant="destructive">Declined</Badge>}
                          {request.status === "pending" && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === "pending" ? (
                            <div className="flex justify-end gap-2">
                              <Button size="sm" onClick={() => handleOpenDialog(request, "accept")}>
                                <Check className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleOpenDialog(request, "decline")}>
                                <X className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleOpenDialog(request, request.status === "accepted" ? "accept" : "decline")
                              }
                            >
                              View Response
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{dialogAction === "accept" ? "Accept Request" : "Decline Request"}</DialogTitle>
            <DialogDescription>
              {dialogAction === "accept"
                ? "Approve this charter request and notify the user."
                : "Decline this charter request and provide a reason."}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">User</h4>
                  <p className="text-sm">{selectedRequest.user}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Route</h4>
                  <p className="text-sm">
                    {selectedRequest.from} to {selectedRequest.to}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Date</h4>
                  <p className="text-sm">{selectedRequest.date}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Aircraft</h4>
                  <p className="text-sm">{selectedRequest.aircraft}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">User Message</h4>
                <p className="text-sm">{selectedRequest.message}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="response-message">Response Message</Label>
                <Textarea
                  id="response-message"
                  placeholder={
                    dialogAction === "accept"
                      ? "Enter acceptance details and any additional information..."
                      : "Enter reason for declining the request..."
                  }
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitResponse}>
              {dialogAction === "accept" ? "Accept Request" : "Decline Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
