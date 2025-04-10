"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Search, MoreHorizontal, UserPlus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    lastActive: "2 hours ago",
    requests: 5,
    joined: "Jan 15, 2023",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    lastActive: "1 day ago",
    requests: 3,
    joined: "Feb 20, 2023",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "user",
    status: "inactive",
    lastActive: "2 weeks ago",
    requests: 2,
    joined: "Mar 10, 2023",
  },
  {
    id: "user-4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "admin",
    status: "active",
    lastActive: "Just now",
    requests: 0,
    joined: "Dec 5, 2022",
  },
  {
    id: "user-5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "user",
    status: "active",
    lastActive: "3 days ago",
    requests: 7,
    joined: "Apr 18, 2023",
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"edit" | "delete">("edit")
  const { toast } = useToast()

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleOpenDialog = (user: any, type: "edit" | "delete") => {
    setSelectedUser(user)
    setDialogType(type)
    setDialogOpen(true)
  }

  const handleAction = () => {
    // In a real app, you would update or delete the user in your backend
    if (dialogType === "edit") {
      toast({
        title: "User updated",
        description: `${selectedUser.name}'s information has been updated.`,
      })
    } else {
      toast({
        title: "User deleted",
        description: `${selectedUser.name} has been removed from the system.`,
        variant: "destructive",
      })
    }
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
        <p className="text-muted-foreground">View and manage user accounts and permissions</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Users</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "outline"}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell>{user.requests}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleOpenDialog(user, "edit")}>Edit User</DropdownMenuItem>
                          <DropdownMenuItem>View Requests</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleOpenDialog(user, "delete")} className="text-red-600">
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogType === "edit" ? "Edit User" : "Delete User"}</DialogTitle>
            <DialogDescription>
              {dialogType === "edit"
                ? "Make changes to the user's information and permissions."
                : "Are you sure you want to delete this user? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && dialogType === "edit" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={selectedUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={selectedUser.email} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="role" defaultChecked={selectedUser.role === "admin"} />
                  <Label htmlFor="role">Admin</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="status" defaultChecked={selectedUser.status === "active"} />
                  <Label htmlFor="status">Active</Label>
                </div>
              </div>
            </div>
          )}
          {selectedUser && dialogType === "delete" && (
            <div className="space-y-2">
              <p>
                You are about to delete the user <strong>{selectedUser.name}</strong> with email{" "}
                <strong>{selectedUser.email}</strong>.
              </p>
              <p>This will remove all their data from the system, including request history.</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAction} variant={dialogType === "delete" ? "destructive" : "default"}>
              {dialogType === "edit" ? "Save Changes" : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
