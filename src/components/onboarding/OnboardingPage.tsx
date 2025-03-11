import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Circle,
  FileText,
  Building2,
  Calendar,
  CheckSquare,
  Warehouse,
  MapPin,
  Truck,
  Package,
  Users,
  Plus,
} from "lucide-react";
import SideNav from "../navigation/SideNav";
import WarehouseForm from "../inventory/WarehouseForm";

const OnboardingPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showWarehouseForm, setShowWarehouseForm] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);

  const handleWarehouseSubmit = (data: any) => {
    console.log("Warehouse data submitted:", data);
    setShowWarehouseForm(false);
    setEditingWarehouse(null);
    // In a real app, you would save this data to your backend
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out h-full ${sidebarCollapsed ? "w-20" : "w-64"}`}
      >
        <SideNav
          userName="Store Manager"
          userRole="manager"
          activeItem="onboarding"
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Store/Warehouse Onboarding</h1>
              <p className="text-gray-500">
                Manage your stores and warehouses across locations
              </p>
            </div>
            <div>
              <Button onClick={() => setShowWarehouseForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Warehouse
              </Button>
            </div>
          </div>

          {showWarehouseForm ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingWarehouse ? "Edit Warehouse" : "Add New Warehouse"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <WarehouseForm
                  warehouse={editingWarehouse}
                  onSubmit={handleWarehouseSubmit}
                  onCancel={() => {
                    setShowWarehouseForm(false);
                    setEditingWarehouse(null);
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
                <TabsTrigger value="checklist">Setup Checklist</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="inventory">Initial Inventory</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Warehouse Onboarding Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            New Warehouses
                          </span>
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <Progress value={100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Setup In Progress
                          </span>
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <Progress value={100} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">
                            Active Locations
                          </span>
                          <span className="text-sm font-medium">8</span>
                        </div>
                        <Progress value={100} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Warehouse Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Downtown Store added as new location
                            </p>
                            <p className="text-sm text-gray-500">2 days ago</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-4">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Main Warehouse setup completed
                            </p>
                            <p className="text-sm text-gray-500">3 days ago</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-4">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <Truck className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Initial inventory received at East Side Location
                            </p>
                            <p className="text-sm text-gray-500">1 week ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Warehouse Setup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">North Side Location</p>
                              <Badge>Opens Jun 15</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              Setup in progress (65%)
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-start gap-4">
                          <div className="bg-orange-100 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">West End Store</p>
                              <Badge>Opens Jul 22</Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              Planning phase (20%)
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="locations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Warehouse Locations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Warehouse className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Main Warehouse</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" /> 123 Main St,
                                Anytown, USA
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowWarehouseForm(true);
                                setEditingWarehouse({
                                  id: "1",
                                  firmName: "Apparel & Craft Co.",
                                  warehouseCode: "WH-001",
                                  warehouseName: "Main Warehouse",
                                  warehouseAddress: "123 Main St, Anytown, USA",
                                  warehouseIncharge: "JohnSmith",
                                  isDefault: true,
                                  isActive: true,
                                });
                              }}
                            >
                              Edit
                            </Button>
                            <Badge variant="default">Active</Badge>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Warehouse Code</p>
                            <p className="font-medium">WH-001</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Incharge</p>
                            <p className="font-medium">John Smith</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Capacity</p>
                            <p className="font-medium">10,000 sq ft</p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full">
                              <Building2 className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Downtown Store</h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" /> 456 Market
                                St, Anytown, USA
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowWarehouseForm(true);
                                setEditingWarehouse({
                                  id: "2",
                                  firmName: "Apparel & Craft Co.",
                                  warehouseCode: "ST-001",
                                  warehouseName: "Downtown Store",
                                  warehouseAddress:
                                    "456 Market St, Anytown, USA",
                                  warehouseIncharge: "SarahJohnson",
                                  isDefault: false,
                                  isActive: true,
                                });
                              }}
                            >
                              Edit
                            </Button>
                            <Badge variant="default">Active</Badge>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Warehouse Code</p>
                            <p className="font-medium">ST-001</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Incharge</p>
                            <p className="font-medium">Sarah Johnson</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Capacity</p>
                            <p className="font-medium">2,500 sq ft</p>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                              <Building2 className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                East Side Location
                              </h3>
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" /> 789 East
                                Blvd, Anytown, USA
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setShowWarehouseForm(true);
                                setEditingWarehouse({
                                  id: "3",
                                  firmName: "Apparel & Craft Co.",
                                  warehouseCode: "ST-002",
                                  warehouseName: "East Side Location",
                                  warehouseAddress:
                                    "789 East Blvd, Anytown, USA",
                                  warehouseIncharge: "MichaelBrown",
                                  isDefault: false,
                                  isActive: true,
                                });
                              }}
                            >
                              Edit
                            </Button>
                            <Badge variant="secondary">Setup in Progress</Badge>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Warehouse Code</p>
                            <p className="font-medium">ST-002</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Incharge</p>
                            <p className="font-medium">Michael Brown</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Capacity</p>
                            <p className="font-medium">3,200 sq ft</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="checklist" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Warehouse Setup Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 border rounded-md bg-gray-50">
                        <CheckSquare className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium">
                            Complete warehouse registration
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          Completed
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-md">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <p className="font-medium">
                            Set up shelving and storage areas
                          </p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-md">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <p className="font-medium">
                            Install inventory tracking system
                          </p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-md bg-gray-50">
                        <CheckSquare className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium">Assign warehouse staff</p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          Completed
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 p-3 border rounded-md">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <div className="flex-1">
                          <p className="font-medium">
                            Complete safety inspection
                          </p>
                        </div>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="font-medium">
                                Warehouse Registration Form
                              </h3>
                              <p className="text-sm text-gray-500">
                                Official registration document for new locations
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="font-medium">
                                Safety Compliance Checklist
                              </h3>
                              <p className="text-sm text-gray-500">
                                Required safety standards for warehouse
                                operations
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="font-medium">
                                Inventory Transfer Form
                              </h3>
                              <p className="text-sm text-gray-500">
                                Document for transferring inventory between
                                locations
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="font-medium">
                                Staff Assignment Form
                              </h3>
                              <p className="text-sm text-gray-500">
                                Form for assigning staff to warehouse locations
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inventory" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Initial Inventory Setup</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Package className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">
                              Step 1: Inventory Categories
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Set up product categories and subcategories for
                              the new location
                            </p>
                            <div className="mt-2">
                              <Progress value={100} className="h-2" />
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">
                                  Completed
                                </span>
                                <span className="text-xs font-medium">
                                  100%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Package className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">
                              Step 2: Initial Stock Order
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Create and submit purchase orders for initial
                              inventory
                            </p>
                            <div className="mt-2">
                              <Progress value={75} className="h-2" />
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">
                                  In Progress
                                </span>
                                <span className="text-xs font-medium">75%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Truck className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">
                              Step 3: Receive Inventory
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Process incoming shipments and update inventory
                              system
                            </p>
                            <div className="mt-2">
                              <Progress value={25} className="h-2" />
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">
                                  Started
                                </span>
                                <span className="text-xs font-medium">25%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">
                              Step 4: Staff Training
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Train warehouse staff on inventory management
                              procedures
                            </p>
                            <div className="mt-2">
                              <Progress value={0} className="h-2" />
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-gray-500">
                                  Not Started
                                </span>
                                <span className="text-xs font-medium">0%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
