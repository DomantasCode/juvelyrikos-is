import React, { useState } from 'react';
import { Gem, Package, ShoppingBag, Users, Calendar, DollarSign, MessageSquare, Home, LogOut, PlusCircle, Search, X, Edit, Trash, ExternalLink } from 'lucide-react';
import './JewelryWorkshop.css'; // Import the CSS file

// Mock data
const mockOrders = [
    { id: 'UŽS-001', customer: 'Domantas Moisejevas', item: 'Auksinis žiedas', status: 'Vykdomas', deadline: '2025-03-15', price: 450 },
    { id: 'UŽS-002', customer: 'Domas Ignatavičius', item: 'Sidabrinio vėrinio taisymas', status: 'Įvykdytas', deadline: '2025-03-01', price: 120 },
    { id: 'UŽS-003', customer: 'Matas Kubilius', item: 'Deimantiniai auskarai', status: 'Laukiama', deadline: '2025-03-30', price: 850 },
    { id: 'UŽS-004', customer: 'Edvardas Tamulevičius', item: 'Apyrankės graviravimas', status: 'Vykdomas', deadline: '2025-03-10', price: 95 },
];

const mockCustomers = [
    { id: 'KLI-001', name: 'Domantas Moisejevas', email: 'domantas.moisejevas@stud.vilniustech.lt', phone: '+370 611 22333', orders: 5, totalSpent: 1250 },
    { id: 'KLI-002', name: 'Domas Ignatavičius', email: 'domas.ignatavicius@stud.vilniustech.lt', phone: '+370 622 33444', orders: 2, totalSpent: 420 },
    { id: 'KLI-003', name: 'Matas Kubilius', email: 'matas.kubilius@stud.vilniustech.lt', phone: '+370 633 44555', orders: 3, totalSpent: 1650 },
    { id: 'KLI-004', name: 'Edvardas Tamulevičius', email: 'edvardas.tamulevicius@stud.vilniustech.lt', phone: '+370 644 55666', orders: 1, totalSpent: 95 },
];

const mockInventory = [
    { id: 'INV-001', item: 'Auksas (18K)', quantity: 250, unit: 'g', status: 'Normalus', reorderPoint: 100 },
    { id: 'INV-002', item: 'Sidabras (925)', quantity: 850, unit: 'g', status: 'Normalus', reorderPoint: 400 },
    { id: 'INV-003', item: 'Deimantas (2mm)', quantity: 12, unit: 'vnt', status: 'Mažas', reorderPoint: 15 },
    { id: 'INV-004', item: 'Safyras (3mm)', quantity: 8, unit: 'vnt', status: 'Mažas', reorderPoint: 10 },
];

const mockCatalog = [
    {
        id: 'KAT-001',
        name: 'Klasikinis auksinis žiedas',
        category: 'Žiedai',
        basePrice: 350,
        customizable: true,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'KAT-002',
        name: 'Sidabrinis grandinėlės vėrinys',
        category: 'Vėriniai',
        basePrice: 180,
        customizable: true,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'KAT-003',
        name: 'Deimantiniai auskarai',
        category: 'Auskarai',
        basePrice: 550,
        customizable: true,
        image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
    {
        id: 'KAT-004',
        name: 'Auksinė apyrankė',
        category: 'Apyrankės',
        basePrice: 280,
        customizable: true,
        image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
    },
];

// Main App Component
const JewelryWorkshopApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [orders, setOrders] = useState(mockOrders);
    const [customers, setCustomers] = useState(mockCustomers);
    const [inventory, setInventory] = useState(mockInventory);
    const [catalog, setCatalog] = useState(mockCatalog);
    const [loginError, setLoginError] = useState('');

    // Modal states
    const [showNewOrderModal, setShowNewOrderModal] = useState(false);
    const [showEditOrderModal, setShowEditOrderModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
    const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [showNewInventoryModal, setShowNewInventoryModal] = useState(false);
    const [showEditInventoryModal, setShowEditInventoryModal] = useState(false);
    const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);

    const [showNewProductModal, setShowNewProductModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showImageViewModal, setShowImageViewModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Handle login
    const handleLogin = (formElements) => {
        // Get values directly from form elements
        const username = formElements.username.value.trim();
        const password = formElements.password.value;

        // Allow any login with non-empty username and password
        if (username && password) {
            setIsLoggedIn(true);
            setLoginError('');
        } else {
            setLoginError('Neteisingas prisijungimo vardas arba slaptažodis!');
        }
    };

    // Handle logout
    const handleLogout = () => {
        if (window.confirm('Ar tikrai norite atsijungti?')) {
            setIsLoggedIn(false);
            setActiveTab('dashboard');
        }
    };

    // Order Modal handlers
    const handleNewOrder = () => {
        setShowNewOrderModal(true);
    };

    const handleOrderSubmit = (order) => {
        const newOrder = {
            id: `UŽS-${orders.length + 1}`.padStart(7, '0'),
            ...order
        };
        setOrders([...orders, newOrder]);
        setShowNewOrderModal(false);
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setShowEditOrderModal(true);
    };

    const handleUpdateOrder = (updatedOrder) => {
        setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
        setShowEditOrderModal(false);
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm('Ar tikrai norite ištrinti šį užsakymą?')) {
            setOrders(orders.filter(order => order.id !== orderId));
        }
    };

    // Customer Modal handlers
    const handleNewCustomer = () => {
        setShowNewCustomerModal(true);
    };

    const handleCustomerSubmit = (customer) => {
        const newCustomer = {
            id: `KLI-${customers.length + 1}`.padStart(7, '0'),
            orders: 0,
            totalSpent: 0,
            ...customer
        };
        setCustomers([...customers, newCustomer]);
        setShowNewCustomerModal(false);
    };

    const handleEditCustomer = (customer) => {
        setSelectedCustomer(customer);
        setShowEditCustomerModal(true);
    };

    const handleUpdateCustomer = (updatedCustomer) => {
        setCustomers(customers.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer));
        setShowEditCustomerModal(false);
    };

    const handleDeleteCustomer = (customerId) => {
        if (window.confirm('Ar tikrai norite ištrinti šį klientą?')) {
            setCustomers(customers.filter(customer => customer.id !== customerId));
        }
    };

    // Inventory Modal handlers
    const handleNewInventoryItem = () => {
        setShowNewInventoryModal(true);
    };

    const handleInventorySubmit = (item) => {
        const newItem = {
            id: `INV-${inventory.length + 1}`.padStart(7, '0'),
            status: item.quantity <= item.reorderPoint ? 'Mažas' : 'Normalus',
            ...item
        };
        setInventory([...inventory, newItem]);
        setShowNewInventoryModal(false);
    };

    const handleEditInventoryItem = (item) => {
        setSelectedInventoryItem(item);
        setShowEditInventoryModal(true);
    };

    const handleUpdateInventoryItem = (updatedItem) => {
        updatedItem.status = updatedItem.quantity <= updatedItem.reorderPoint ? 'Mažas' : 'Normalus';
        setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item));
        setShowEditInventoryModal(false);
    };

    const handleOrderInventoryItem = (itemId) => {
        setInventory(inventory.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + item.reorderPoint;
                return {
                    ...item,
                    quantity: newQuantity,
                    status: newQuantity <= item.reorderPoint ? 'Mažas' : 'Normalus'
                };
            }
            return item;
        }));

        const item = inventory.find(i => i.id === itemId);
        if (item) {
            alert(`Užsakyta ${item.reorderPoint} ${item.unit} ${item.item}. Kiekis padidintas.`);
        }
    };

    // Dashboard quick order function
    const handleQuickOrder = (itemId) => {
        setInventory(inventory.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + item.reorderPoint;
                return {
                    ...item,
                    quantity: newQuantity,
                    status: newQuantity <= item.reorderPoint ? 'Mažas' : 'Normalus'
                };
            }
            return item;
        }));

        const item = inventory.find(i => i.id === itemId);
        if (item) {
            alert(`Užsakyta ${item.reorderPoint} ${item.unit} ${item.item}. Kiekis padidintas.`);
        }
    };

    // Product handlers
    const handleAddProduct = (product) => {
        const newProduct = {
            id: `KAT-${catalog.length + 1}`.padStart(7, '0'),
            ...product
        };
        setCatalog([...catalog, newProduct]);
        setShowNewProductModal(false);
    };

    const handleViewImage = (product) => {
        setSelectedImage(product.image);
        setShowImageViewModal(true);
    };

    const handleCustomize = (product) => {
        setSelectedProduct(product);
        setShowCustomizeModal(true);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard inventory={inventory} orders={orders} onOrderItem={handleQuickOrder} handleNewOrder={handleNewOrder} />;
            case 'orders':
                return <Orders
                    orders={orders}
                    onNewOrder={handleNewOrder}
                    onEditOrder={handleEditOrder}
                    onDeleteOrder={handleDeleteOrder}
                />;
            case 'customers':
                return <Customers
                    customers={customers}
                    onNewCustomer={handleNewCustomer}
                    onEditCustomer={handleEditCustomer}
                    onDeleteCustomer={handleDeleteCustomer}
                />;
            case 'inventory':
                return <Inventory
                    inventory={inventory}
                    onNewItem={handleNewInventoryItem}
                    onEditItem={handleEditInventoryItem}
                    onOrderItem={handleOrderInventoryItem}
                />;
            case 'catalog':
                return <Catalog
                    catalog={catalog}
                    onAddProduct={handleAddProduct}
                    onViewImage={handleViewImage}
                    onCustomize={handleCustomize}
                />;
            case 'production':
                return <Production orders={orders} setOrders={setOrders} />;
            case 'payments':
                return <Payments />;
            case 'feedback':
                return <Feedback />;
            default:
                return <Dashboard inventory={inventory} orders={orders} onOrderItem={handleQuickOrder} />;
        }
    };

    // If not logged in, show login screen
    if (!isLoggedIn) {
        return (
            <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', background: '#f3f4f6' }}>
                <div style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
                    <div className="card">
                        <div className="card-header" style={{ textAlign: 'center', borderBottomWidth: '2px' }}>
                            <h2 className="card-title" style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                Juvelyrinių dirbinių valdymo sistema
                            </h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => { e.preventDefault(); handleLogin(e.target.elements); }}>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="username">Vartotojo vardas</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">Slaptažodis</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                    />
                                </div>

                                {loginError && (
                                    <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>
                                        {loginError}
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                        Prisijungti
                                    </button>
                                </div>

                                <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#6b7280' }}>
                                    <p>Demo prisijungimo duomenys: admin / admin</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h1 className="sidebar-title">Juvelyrinių dirbinių</h1>
                    <p className="sidebar-subtitle">Valdymo sistema</p>
                </div>
                <nav className="sidebar-nav">
                    <SidebarItem icon={<Home />} label="Pradžia" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
                    <SidebarItem icon={<ShoppingBag />} label="Užsakymai" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
                    <SidebarItem icon={<Users />} label="Klientai" active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} />
                    <SidebarItem icon={<Package />} label="Inventorius" active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
                    <SidebarItem icon={<Gem />} label="Katalogas" active={activeTab === 'catalog'} onClick={() => setActiveTab('catalog')} />
                    <SidebarItem icon={<Calendar />} label="Gamyba" active={activeTab === 'production'} onClick={() => setActiveTab('production')} />
                    <SidebarItem icon={<DollarSign />} label="Mokėjimai" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
                    <SidebarItem icon={<MessageSquare />} label="Atsiliepimai" active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')} />
                    <div className="sidebar-footer">
                        <SidebarItem icon={<LogOut />} label="Atsijungti" onClick={handleLogout} />
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <header className="header">
                    <div className="header-content">
                        <h2 className="page-title">
                            {activeTab === 'dashboard' ? 'Pradžia' :
                                activeTab === 'orders' ? 'Užsakymai' :
                                    activeTab === 'customers' ? 'Klientai' :
                                        activeTab === 'inventory' ? 'Inventorius' :
                                            activeTab === 'catalog' ? 'Katalogas' :
                                                activeTab === 'production' ? 'Gamyba' :
                                                    activeTab === 'payments' ? 'Mokėjimai' :
                                                        activeTab === 'feedback' ? 'Atsiliepimai' : activeTab}
                        </h2>
                    </div>
                </header>
                <main className="main">
                    {renderContent()}
                </main>
            </div>

            {/* Modals */}
            {showNewOrderModal && (
                <OrderModal
                    onClose={() => setShowNewOrderModal(false)}
                    onSubmit={handleOrderSubmit}
                    customers={customers}
                />
            )}

            {showEditOrderModal && (
                <OrderModal
                    order={selectedOrder}
                    onClose={() => setShowEditOrderModal(false)}
                    onSubmit={handleUpdateOrder}
                    customers={customers}
                    isEditing={true}
                />
            )}

            {showNewCustomerModal && (
                <CustomerModal
                    onClose={() => setShowNewCustomerModal(false)}
                    onSubmit={handleCustomerSubmit}
                />
            )}

            {showEditCustomerModal && (
                <CustomerModal
                    customer={selectedCustomer}
                    onClose={() => setShowEditCustomerModal(false)}
                    onSubmit={handleUpdateCustomer}
                    isEditing={true}
                />
            )}

            {showNewInventoryModal && (
                <InventoryModal
                    onClose={() => setShowNewInventoryModal(false)}
                    onSubmit={handleInventorySubmit}
                />
            )}

            {showEditInventoryModal && (
                <InventoryModal
                    item={selectedInventoryItem}
                    onClose={() => setShowEditInventoryModal(false)}
                    onSubmit={handleUpdateInventoryItem}
                    isEditing={true}
                />
            )}

            {showNewProductModal && (
                <ProductModal
                    onClose={() => setShowNewProductModal(false)}
                    onSubmit={handleAddProduct}
                />
            )}

            {showImageViewModal && (
                <ImageViewModal
                    imageUrl={selectedImage}
                    onClose={() => setShowImageViewModal(false)}
                />
            )}

            {showCustomizeModal && (
                <CustomizeModal
                    product={selectedProduct}
                    onClose={() => setShowCustomizeModal(false)}
                    onSubmit={(customization) => {
                        alert(`Produktas ${selectedProduct.name} pritaikytas: ${customization}`);
                        setShowCustomizeModal(false);
                    }}
                />
            )}

            {showLoginModal && (
                <LoginModal
                    onClose={() => setShowLoginModal(false)}
                    onLogin={(credentials) => {
                        alert(`Sveiki sugrįžę, ${credentials.username}!`);
                        setShowLoginModal(false);
                    }}
                />
            )}
        </div>
    );
};

// Sidebar Item Component
const SidebarItem = ({ icon, label, active = false, onClick }) => {
    return (
        <div
            className={`sidebar-item ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            <span className="sidebar-item-icon">{icon}</span>
            <span>{label}</span>
        </div>
    );
};

// Dashboard Component
const Dashboard = ({ inventory, orders, onOrderItem, handleNewOrder }) => {
    return (
        <div>
            <div className="dashboard-grid">
                <StatCard title="Užsakymai iš viso" value="26" icon={<ShoppingBag className="stat-card-icon indigo" />} change="+5%" positive={true} />
                <StatCard title="Aktyvūs klientai" value="18" icon={<Users className="stat-card-icon green" />} change="+12%" positive={true} />
                <StatCard title="Mažo kiekio prekės" value="5" icon={<Package className="stat-card-icon orange" />} change="-2" positive={false} />
                <StatCard title="Mėnesio pajamos" value="€4,850" icon={<DollarSign className="stat-card-icon blue" />} change="+18%" positive={true} />

                <div className="dashboard-grid-col-2">
                    <Card title="Naujausi užsakymai">
                        <div className="table-container">
                            <table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Klientas</th>
                                    <th>Prekė</th>
                                    <th>Būsena</th>
                                    <th>Kaina</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.slice(0, 3).map((order) => (
                                    <tr key={order.id}>
                                        <td className="table-text-regular">{order.id}</td>
                                        <td className="table-text-medium">{order.customer}</td>
                                        <td className="table-text-regular">{order.item}</td>
                                        <td>
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="table-text-regular">€{order.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                            <button className="btn btn-primary" onClick={handleNewOrder}>
                                <PlusCircle size={16} className="btn-icon" />
                                Naujas užsakymas
                            </button>
                        </div>
                    </Card>
                </div>

                <div className="dashboard-grid-col-2">
                    <Card title="Inventoriaus perspėjimai">
                        <div>
                            {inventory.filter(item => item.status === 'Mažas').map((item) => (
                                <div key={item.id} className="alert-item">
                                    <div className="alert-item-info">
                                        <p className="alert-item-title">{item.item}</p>
                                        <p className="alert-item-details">Dabartinis: {item.quantity} {item.unit} (Papildyti iki: {item.reorderPoint} {item.unit})</p>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => onOrderItem(item.id)}>Užsakyti</button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Orders Component
const Orders = ({ orders, onNewOrder, onEditOrder, onDeleteOrder }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="action-bar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Ieškoti užsakymų..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" />
                </div>
                <button className="btn btn-primary" onClick={onNewOrder}>
                    <PlusCircle size={16} className="btn-icon" />
                    Naujas užsakymas
                </button>
            </div>

            <Card>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Klientas</th>
                            <th>Prekė</th>
                            <th>Būsena</th>
                            <th>Terminas</th>
                            <th>Kaina</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="table-text-regular">{order.id}</td>
                                <td className="table-text-medium">{order.customer}</td>
                                <td className="table-text-regular">{order.item}</td>
                                <td>
                                    <StatusBadge status={order.status} />
                                </td>
                                <td className="table-text-regular">{order.deadline}</td>
                                <td className="table-text-regular">€{order.price}</td>
                                <td>
                                    <button className="btn btn-link" onClick={() => onEditOrder(order)}>Redaguoti</button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-link btn-danger" onClick={() => onDeleteOrder(order.id)}>Ištrinti</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// Customers Component
const Customers = ({ customers, onNewCustomer, onEditCustomer, onDeleteCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="action-bar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Ieškoti klientų..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" />
                </div>
                <button className="btn btn-primary" onClick={onNewCustomer}>
                    <PlusCircle size={16} className="btn-icon" />
                    Naujas klientas
                </button>
            </div>

            <Card>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vardas</th>
                            <th>El. paštas</th>
                            <th>Telefonas</th>
                            <th>Užsakymai</th>
                            <th>Išleista</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="table-text-regular">{customer.id}</td>
                                <td className="table-text-medium">{customer.name}</td>
                                <td className="table-text-regular">{customer.email}</td>
                                <td className="table-text-regular">{customer.phone}</td>
                                <td className="table-text-regular">{customer.orders}</td>
                                <td className="table-text-regular">€{customer.totalSpent}</td>
                                <td>
                                    <button className="btn btn-link" onClick={() => onEditCustomer(customer)}>
                                        Redaguoti
                                    </button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-link btn-danger" onClick={() => onDeleteCustomer(customer.id)}>
                                        Ištrinti
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// Inventory Component
const Inventory = ({ inventory, onNewItem, onEditItem, onOrderItem }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInventory = inventory.filter(item =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="action-bar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Ieškoti inventoriuje..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" />
                </div>
                <button className="btn btn-primary" onClick={onNewItem}>
                    <PlusCircle size={16} className="btn-icon" />
                    Pridėti medžiagą
                </button>
            </div>

            <Card>
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pavadinimas</th>
                            <th>Kiekis</th>
                            <th>Matas</th>
                            <th>Būsena</th>
                            <th>Papildymo riba</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredInventory.map((item) => (
                            <tr key={item.id}>
                                <td className="table-text-regular">{item.id}</td>
                                <td className="table-text-medium">{item.item}</td>
                                <td className="table-text-regular">{item.quantity}</td>
                                <td className="table-text-regular">{item.unit}</td>
                                <td>
                                    <InventoryStatusBadge status={item.status} />
                                </td>
                                <td className="table-text-regular">{item.reorderPoint} {item.unit}</td>
                                <td>
                                    <button className="btn btn-link" onClick={() => onEditItem(item)}>Atnaujinti</button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-link" onClick={() => onOrderItem(item.id)}>Užsakyti</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// Catalog Component
const Catalog = ({ catalog, onAddProduct, onViewImage, onCustomize }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNewProductModal, setShowNewProductModal] = useState(false);

    const filteredCatalog = catalog.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        setShowNewProductModal(true);
    };

    return (
        <div>
            <div className="action-bar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Ieškoti kataloge..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" />
                </div>
                <button className="btn btn-primary" onClick={handleAddProduct}>
                    <PlusCircle size={16} className="btn-icon" />
                    Pridėti produktą
                </button>
            </div>

            {showNewProductModal && (
                <ProductModal
                    onClose={() => setShowNewProductModal(false)}
                    onSubmit={onAddProduct}
                />
            )}

            <div className="catalog-grid">
                {filteredCatalog.map((product) => (
                    <CatalogItem
                        key={product.id}
                        product={product}
                        onViewImage={() => onViewImage(product)}
                        onCustomize={() => onCustomize(product)}
                    />
                ))}
            </div>
        </div>
    );
};

// Updated Production Component
const Production = ({ orders, setOrders }) => {
    // Mock data for production orders and craftsmen
    const [productionOrders, setProductionOrders] = useState([
        { id: 'UŽS-001', item: 'Auksinis žiedas', customer: 'Domantas Moisejevas', startDate: '2025-03-05', deadline: '2025-03-15', status: 'Vykdomas', assignedTo: 'Petras Jonaitis' },
        { id: 'UŽS-004', item: 'Apyrankės graviravimas', customer: 'Edvardas Tamulevičius', startDate: '2025-03-08', deadline: '2025-03-10', status: 'Vykdomas', assignedTo: 'Marius Petraitis' },
        { id: 'UŽS-003', item: 'Deimantiniai auskarai', customer: 'Matas Kubilius', startDate: '', deadline: '2025-03-30', status: 'Laukiama', assignedTo: '' }
    ]);

    const craftsmen = [
        { id: 1, name: 'Petras Jonaitis', specialization: 'Žiedai, apyrankės' },
        { id: 2, name: 'Marius Petraitis', specialization: 'Graviravimas, apdirbimas' },
        { id: 3, name: 'Jonas Kazlauskas', specialization: 'Vėriniai, auskarai' },
        { id: 4, name: 'Ieva Petraitė', specialization: 'Taisymas, restauravimas' }
    ];

    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Handle craftsman assignment
    const handleAssignCraftsman = (order) => {
        setSelectedOrder(order);
        setShowAssignModal(true);
    };

    // Update order with assigned craftsman
    const handleAssignSubmit = (orderId, craftsmanName, startDate) => {
        setProductionOrders(productionOrders.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    assignedTo: craftsmanName,
                    startDate: startDate,
                    status: 'Vykdomas'
                };
            }
            return order;
        }));

        // Also update main orders state if the order exists there
        if (orders && setOrders) {
            setOrders(orders.map(order => {
                if (order.id === orderId) {
                    return {
                        ...order,
                        status: 'Vykdomas'
                    };
                }
                return order;
            }));
        }

        setShowAssignModal(false);
    };

    // Filter orders based on search
    const filteredOrders = productionOrders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.assignedTo && order.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calculate days remaining
    const calculateDaysRemaining = (deadline) => {
        if (!deadline) return "Nėra termino";
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff < 0) return "Vėluoja";
        if (daysDiff === 0) return "Šiandien";
        return `${daysDiff} d.`;
    };

    return (
        <div>
            <div className="action-bar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Ieškoti gamybos užduočių..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" />
                </div>
            </div>

            <Card title="Gamybos tvarkaraštis">
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Užsakymo ID</th>
                            <th>Prekė</th>
                            <th>Klientas</th>
                            <th>Paskirtas meistras</th>
                            <th>Pradžios data</th>
                            <th>Terminas</th>
                            <th>Liko dienų</th>
                            <th>Būsena</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td className="table-text-regular">{order.id}</td>
                                <td className="table-text-medium">{order.item}</td>
                                <td className="table-text-regular">{order.customer}</td>
                                <td className="table-text-regular">
                                    {order.assignedTo || 'Nepriskirta'}
                                </td>
                                <td className="table-text-regular">{order.startDate || '-'}</td>
                                <td className="table-text-regular">{order.deadline}</td>
                                <td className="table-text-regular">
                                    {calculateDaysRemaining(order.deadline)}
                                </td>
                                <td>
                                    <StatusBadge status={order.status} />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-link"
                                        onClick={() => handleAssignCraftsman(order)}
                                    >
                                        {order.assignedTo ? 'Pakeisti meistrą' : 'Priskirti meistrą'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Craftsman Assignment Modal */}
            {showAssignModal && selectedOrder && (
                <AssignCraftsmanModal
                    order={selectedOrder}
                    craftsmen={craftsmen}
                    onClose={() => setShowAssignModal(false)}
                    onSubmit={handleAssignSubmit}
                />
            )}
        </div>
    );
};

// Modal for assigning craftsmen to production jobs
const AssignCraftsmanModal = ({ order, craftsmen, onClose, onSubmit }) => {
    const today = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        orderId: order.id,
        craftsmanName: order.assignedTo || '',
        startDate: order.startDate || today
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData.orderId, formData.craftsmanName, formData.startDate);
    };

    return (
        <Modal
            title={`Priskirti meistrą užsakymui ${order.id}`}
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Priskirti meistrą
                    </button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <label className="form-label">Užsakymas</label>
                    <p><strong>{order.item}</strong> • Klientas: {order.customer}</p>
                    <p>Terminas: {order.deadline}</p>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="craftsmanName">Pasirinkite meistrą</label>
                    <select
                        className="form-select"
                        id="craftsmanName"
                        name="craftsmanName"
                        value={formData.craftsmanName}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Pasirinkite meistrą</option>
                        {craftsmen.map(craftsman => (
                            <option key={craftsman.id} value={craftsman.name}>
                                {craftsman.name} ({craftsman.specialization})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="startDate">Darbų pradžios data</label>
                    <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        min={today}
                        max={order.deadline}
                        required
                    />
                </div>
            </form>
        </Modal>
    );
};

// Payments Component
const Payments = () => {
    // Mock payment data
    const [payments, setPayments] = useState([
        { id: 1, date: '2025-03-01', orderId: 'UŽS-002', customer: 'Domas Ignatavičius', method: 'Kreditinė kortelė', amount: 120, status: 'Įvykdytas' },
        { id: 2, date: '2025-03-02', orderId: 'UŽS-001', customer: 'Domantas Moisejevas', method: 'Banko pervedimas', amount: 225, status: 'Dalinis' },
        { id: 3, date: '2025-03-03', orderId: 'UŽS-003', customer: 'Matas Kubilius', method: 'PayPal', amount: 850, status: 'Laukiama' },
        { id: 4, date: '2025-02-28', orderId: 'UŽS-007', customer: 'Edvardas Tamulevičius', method: 'Banko pervedimas', amount: 95, status: 'Laukiama' }
    ]);

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter payments based on search term
    const filteredPayments = payments.filter(payment =>
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit payment status
    const handleEditPayment = (payment) => {
        setSelectedPayment(payment);
        setShowEditModal(true);
    };

    // Update payment status
    const handleUpdatePayment = (id, newStatus) => {
        setPayments(payments.map(payment =>
            payment.id === id ? { ...payment, status: newStatus } : payment
        ));
        setShowEditModal(false);
    };

    return (
        <div>
            <div className="dashboard-grid">
                <StatCard title="Visos pajamos" value="€12,850" icon={<DollarSign className="stat-card-icon green" />} change="+15%" positive={true} />
                <StatCard title="Laukiami mokėjimai" value="€1,250" icon={<DollarSign className="stat-card-icon orange" />} change="+2%" positive={false} />
                <StatCard title="Vėluojantys mokėjimai" value="€450" icon={<DollarSign className="stat-card-icon red" />} change="-10%" positive={true} />
                <StatCard title="Vidutinis užsakymas" value="€380" icon={<ShoppingBag className="stat-card-icon blue" />} change="+8%" positive={true} />
            </div>

            <div className="action-bar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Ieškoti mokėjimų..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="search-icon" />
                </div>
            </div>

            <Card title="Mokėjimo operacijos">
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Užsakymo ID</th>
                            <th>Klientas</th>
                            <th>Mokėjimo būdas</th>
                            <th>Suma</th>
                            <th>Būsena</th>
                            <th>Veiksmai</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPayments.map((payment) => (
                            <tr key={payment.id}>
                                <td className="table-text-regular">{payment.date}</td>
                                <td className="table-text-regular">{payment.orderId}</td>
                                <td className="table-text-medium">{payment.customer}</td>
                                <td className="table-text-regular">{payment.method}</td>
                                <td className="table-text-regular">€{payment.amount}</td>
                                <td>
                                    <PaymentStatusBadge status={payment.status} />
                                </td>
                                <td>
                                    <button className="btn btn-link" onClick={() => handleEditPayment(payment)}>
                                        Keisti būseną
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {showEditModal && selectedPayment && (
                <PaymentStatusModal
                    payment={selectedPayment}
                    onClose={() => setShowEditModal(false)}
                    onUpdate={handleUpdatePayment}
                />
            )}
        </div>
    );
};

// Payment Status Modal Component
const PaymentStatusModal = ({ payment, onClose, onUpdate }) => {
    const [status, setStatus] = useState(payment.status);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(payment.id, status);
    };

    return (
        <Modal
            title={`Keisti mokėjimo būseną - ${payment.orderId}`}
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>Atnaujinti</button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <p><strong>Klientas:</strong> {payment.customer}</p>
                    <p><strong>Suma:</strong> €{payment.amount}</p>
                    <p><strong>Mokėjimo būdas:</strong> {payment.method}</p>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="status">Mokėjimo būsena</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Įvykdytas">Įvykdytas</option>
                        <option value="Laukiama">Laukiama</option>
                        <option value="Dalinis">Dalinis</option>
                        <option value="Nepavyko">Nepavyko</option>
                    </select>
                </div>
            </form>
        </Modal>
    );
};

// Feedback Component
const Feedback = () => {
    // Feedback data
    const [feedbackItems, setFeedbackItems] = useState([
        {
            id: 1,
            customer: "Domantas Moisejevas",
            date: "2025-03-01",
            rating: 5,
            product: "Auksinis žiedas",
            comment: "Nepaprastai puikus darbas! Žiedas viršijo mano lūkesčius. Meistro darbas išskirtinis ir dizainas tiksliai toks, kokio norėjau."
        },
        {
            id: 2,
            customer: "Domas Ignatavičius",
            date: "2025-02-28",
            rating: 4,
            product: "Sidabrinio vėrinio taisymas",
            comment: "Puikus vėrinio taisymas. Atrodo beveik kaip naujas. Aptarnavimas buvo greitas ir profesionalus."
        },
        {
            id: 3,
            customer: "Matas Kubilius",
            date: "2025-02-25",
            rating: 3,
            product: "Auksinė apyrankė",
            comment: "Apyrankė graži, bet užsegimas atrodo šiek tiek laisvas. Klientų aptarnavimas buvo labai malonus ir pasiūlė nemokamai sutaisyti."
        },
        {
            id: 4,
            customer: "Edvardas Tamulevičius",
            date: "2025-02-20",
            rating: 5,
            product: "Deimantiniai auskarai",
            comment: "Auskarai puikūs, labai patenkinta žmona. Ačiū už puikų darbą ir konsultacijas."
        },
        {
            id: 5,
            customer: "Gintarė Kazlauskienė",
            date: "2025-02-15",
            rating: 4,
            product: "Sidabrinis vėrinys",
            comment: "Labai gražus vėrinys, nešioju kasdien. Malonus aptarnavimas."
        }
    ]);

    // Sorting state
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

    // Handle sort change
    const handleSort = (field) => {
        if (sortBy === field) {
            // Toggle sort order if same field
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new sort field with default descending order
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    // Sort feedback items
    const sortedFeedback = [...feedbackItems].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'date':
                comparison = new Date(a.date) - new Date(b.date);
                break;
            case 'rating':
                comparison = a.rating - b.rating;
                break;
            case 'customer':
                comparison = a.customer.localeCompare(b.customer);
                break;
            case 'product':
                comparison = a.product.localeCompare(b.product);
                break;
            default:
                comparison = 0;
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Calculate overall stats
    const averageRating = (feedbackItems.reduce((sum, item) => sum + item.rating, 0) / feedbackItems.length).toFixed(1);

    // Count ratings by star level
    const ratingCounts = feedbackItems.reduce((counts, item) => {
        counts[item.rating] = (counts[item.rating] || 0) + 1;
        return counts;
    }, {});

    // Calculate percentages for each rating
    const getRatingPercentage = (rating) => {
        const count = ratingCounts[rating] || 0;
        return Math.round((count / feedbackItems.length) * 100);
    };

    return (
        <div>
            <div className="dashboard-grid">
                <div className="dashboard-grid-col-2">
                    <Card title="Atsiliepimai">
                        <div className="action-bar" style={{ marginTop: 0, marginBottom: '1rem' }}>
                            <div>
                                <span style={{ marginRight: '0.5rem' }}>Rikiuoti pagal:</span>
                                <button
                                    className={`btn ${sortBy === 'date' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => handleSort('date')}
                                    style={{ marginRight: '0.5rem' }}
                                >
                                    Data {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button
                                    className={`btn ${sortBy === 'rating' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => handleSort('rating')}
                                    style={{ marginRight: '0.5rem' }}
                                >
                                    Įvertinimas {sortBy === 'rating' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button
                                    className={`btn ${sortBy === 'customer' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => handleSort('customer')}
                                    style={{ marginRight: '0.5rem' }}
                                >
                                    Klientas {sortBy === 'customer' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                                <button
                                    className={`btn ${sortBy === 'product' ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => handleSort('product')}
                                >
                                    Produktas {sortBy === 'product' && (sortOrder === 'asc' ? '↑' : '↓')}
                                </button>
                            </div>
                        </div>

                        <div>
                            {sortedFeedback.map(item => (
                                <FeedbackItem
                                    key={item.id}
                                    customer={item.customer}
                                    date={item.date}
                                    rating={item.rating}
                                    product={item.product}
                                    comment={item.comment}
                                />
                            ))}
                        </div>
                    </Card>
                </div>

                <div>
                    <Card title="Atsiliepimų statistika">
                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4f46e5' }}>{averageRating}</div>
                            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem' }}>Vidutinis įvertinimas</div>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                                <StarRating rating={parseFloat(averageRating)} />
                            </div>
                        </div>

                        <div>
                            <RatingBar label="5 Žvaigždutės" percentage={getRatingPercentage(5)} />
                            <RatingBar label="4 Žvaigždutės" percentage={getRatingPercentage(4)} />
                            <RatingBar label="3 Žvaigždutės" percentage={getRatingPercentage(3)} />
                            <RatingBar label="2 Žvaigždutės" percentage={getRatingPercentage(2)} />
                            <RatingBar label="1 Žvaigždutė" percentage={getRatingPercentage(1)} />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Modal Components
const Modal = ({ title, onClose, children, footer }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                {footer && (
                    <div className="modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

// Order Modal
const OrderModal = ({ order, onClose, onSubmit, customers, isEditing = false }) => {
    const [formData, setFormData] = useState(order || {
        customer: '',
        item: '',
        status: 'Laukiama',
        deadline: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'price' ? parseInt(value, 10) || '' : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal
            title={isEditing ? 'Redaguoti užsakymą' : 'Naujas užsakymas'}
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {isEditing ? 'Atnaujinti' : 'Sukurti'} užsakymą
                    </button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="customer">Klientas</label>
                    <select
                        className="form-select"
                        id="customer"
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Pasirinkite klientą</option>
                        {customers.map(customer => (
                            <option key={customer.id} value={customer.name}>{customer.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="item">Prekės aprašymas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="item"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="status">Būsena</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Laukiama">Laukiama</option>
                        <option value="Vykdomas">Vykdomas</option>
                        <option value="Įvykdytas">Įvykdytas</option>
                        <option value="Atšauktas">Atšauktas</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="deadline">Terminas</label>
                    <input
                        type="date"
                        className="form-control"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="price">Kaina (€)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </Modal>
    );
};

// Customer Modal
const CustomerModal = ({ customer, onClose, onSubmit, isEditing = false }) => {
    const [formData, setFormData] = useState(customer || {
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal
            title={isEditing ? 'Redaguoti klientą' : 'Pridėti klientą'}
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {isEditing ? 'Atnaujinti' : 'Pridėti'} klientą
                    </button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Vardas ir pavardė</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">El. pašto adresas</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="phone">Telefono numeris</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </Modal>
    );
};

// Product Modal
const ProductModal = ({ product, onClose, onSubmit, isEditing = false }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        category: 'Žiedai',
        basePrice: '',
        customizable: true,
        image: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked :
                name === 'basePrice' ? parseInt(value, 10) || '' : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal
            title={isEditing ? 'Redaguoti produktą' : 'Naujas produktas'}
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {isEditing ? 'Atnaujinti' : 'Pridėti'} produktą
                    </button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Produkto pavadinimas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="category">Kategorija</label>
                    <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="Žiedai">Žiedai</option>
                        <option value="Vėriniai">Vėriniai</option>
                        <option value="Auskarai">Auskarai</option>
                        <option value="Apyrankės">Apyrankės</option>
                        <option value="Pakabukai">Pakabukai</option>
                        <option value="Kita">Kita</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="basePrice">Bazinė kaina (€)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="basePrice"
                        name="basePrice"
                        value={formData.basePrice}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="image">Nuotraukos URL</label>
                    <input
                        type="url"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                <div className="form-group">
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="customizable"
                            name="customizable"
                            checked={formData.customizable}
                            onChange={handleChange}
                        />
                        <label className="form-label" htmlFor="customizable" style={{ marginLeft: '10px' }}>
                            Pritaikomas produktas
                        </label>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

// Login Modal
const LoginModal = ({ onClose, onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <Modal
            title="Prisijungimas"
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>Prisijungti</button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Vartotojo vardas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Slaptažodis</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
            </form>
        </Modal>
    );
};

// Inventory Modal
const InventoryModal = ({ item, onClose, onSubmit, isEditing = false }) => {
    const [formData, setFormData] = useState(item || {
        item: '',
        quantity: '',
        unit: 'g',
        reorderPoint: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'quantity' || name === 'reorderPoint' ? parseInt(value, 10) || '' : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Modal
            title={isEditing ? 'Atnaujinti atsargas' : 'Pridėti medžiagą'}
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {isEditing ? 'Atnaujinti' : 'Pridėti'} medžiagą
                    </button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="item">Medžiagos pavadinimas</label>
                    <input
                        type="text"
                        className="form-control"
                        id="item"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="quantity">Kiekis</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="unit">Matavimo vienetas</label>
                    <select
                        className="form-select"
                        id="unit"
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                    >
                        <option value="g">Gramai (g)</option>
                        <option value="kg">Kilogramai (kg)</option>
                        <option value="vnt">Vienetai (vnt)</option>
                        <option value="m">Metrai (m)</option>
                        <option value="cm">Centimetrai (cm)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="reorderPoint">Papildymo riba</label>
                    <input
                        type="number"
                        className="form-control"
                        id="reorderPoint"
                        name="reorderPoint"
                        value={formData.reorderPoint}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
            </form>
        </Modal>
    );
};

// Utility Components
const Card = ({ title, children }) => {
    return (
        <div className="card">
            {title && (
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, change, positive }) => {
    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <h3 className="stat-card-title">{title}</h3>
                {icon}
            </div>
            <div>
                <p className="stat-card-value">{value}</p>
                {change && (
                    <p className={`stat-card-change ${positive ? 'positive' : 'negative'}`}>
                        {change} lyginant su praėjusiu mėnesiu
                    </p>
                )}
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    let className = 'status-badge';

    switch (status.toLowerCase()) {
        case 'įvykdytas':
            className += ' completed';
            break;
        case 'vykdomas':
            className += ' in-progress';
            break;
        case 'laukiama':
            className += ' pending';
            break;
        case 'atšauktas':
            className += ' cancelled';
            break;
        default:
            break;
    }

    return (
        <span className={className}>{status}</span>
    );
};

const InventoryStatusBadge = ({ status }) => {
    let className = 'status-badge inventory-badge';

    switch (status.toLowerCase()) {
        case 'normalus':
            className += ' normal';
            break;
        case 'mažas':
            className += ' low';
            break;
        case 'nėra':
            className += ' out';
            break;
        default:
            break;
    }

    return (
        <span className={className}>{status}</span>
    );
};

const PaymentStatusBadge = ({ status }) => {
    let className = 'status-badge payment-badge';

    switch (status.toLowerCase()) {
        case 'įvykdytas':
            className += ' completed';
            break;
        case 'laukiama':
            className += ' pending';
            break;
        case 'nepavyko':
            className += ' failed';
            break;
        case 'dalinis':
            className += ' partial';
            break;
        default:
            break;
    }

    return (
        <span className={className}>{status}</span>
    );
};

// Two additional modals for viewing images and customizing products
const ImageViewModal = ({ imageUrl, onClose }) => {
    return (
        <Modal
            title="Produkto nuotrauka"
            onClose={onClose}
            footer={
                <button className="btn btn-primary" onClick={onClose}>Uždaryti</button>
            }
        >
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
                <img
                    src={imageUrl}
                    alt="Produkto nuotrauka"
                    style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                />
            </div>
        </Modal>
    );
};

const CustomizeModal = ({ product, onClose, onSubmit }) => {
    const [customization, setCustomization] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(customization);
    };

    return (
        <Modal
            title={`Pritaikyti: ${product.name}`}
            onClose={onClose}
            footer={
                <>
                    <button className="btn btn-secondary" onClick={onClose}>Atšaukti</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>Pateikti</button>
                </>
            }
        >
            <form>
                <div className="form-group">
                    <label className="form-label" htmlFor="customization">Įveskite pritaikymo reikalavimus:</label>
                    <textarea
                        className="form-control"
                        id="customization"
                        rows="5"
                        value={customization}
                        onChange={(e) => setCustomization(e.target.value)}
                        placeholder="Aprašykite kokius pakeitimus norėtumėte atlikti šiam produktui..."
                        required
                    ></textarea>
                </div>
            </form>
        </Modal>
    );
};

const CatalogItem = ({ product, onViewImage, onCustomize }) => {
    return (
        <div className="catalog-item">
            <div className="catalog-item-image">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="catalog-item-info">
                <h3 className="catalog-item-title">{product.name}</h3>
                <p className="catalog-item-category">{product.category}</p>
                <div className="catalog-item-price-row">
                    <p className="catalog-item-price">€{product.basePrice}</p>
                    {product.customizable && (
                        <span className="catalog-item-customizable">Pritaikomas</span>
                    )}
                </div>
                <div className="catalog-item-actions">
                    <button
                        className="btn btn-primary"
                        style={{ flex: product.customizable ? 1 : 2 }}
                        onClick={() => onViewImage(product)}
                    >
                        Peržiūrėti
                    </button>
                    {product.customizable && (
                        <button
                            className="btn btn-secondary"
                            style={{ flex: 1 }}
                            onClick={() => onCustomize(product)}
                        >
                            Pritaikyti
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const FeedbackItem = ({ customer, date, rating, product, comment }) => {
    return (
        <div className="feedback-item">
            <div className="feedback-header">
                <div>
                    <h4 className="feedback-customer">{customer}</h4>
                    <p className="feedback-product">{product}</p>
                </div>
                <p className="feedback-date">{date}</p>
            </div>
            <div className="star-rating">
                <StarRating rating={rating} />
            </div>
            <p className="feedback-comment">{comment}</p>
        </div>
    );
};

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`}>★</span>
            ))}
            {hasHalfStar && <span>★</span>}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="star-empty">★</span>
            ))}
        </div>
    );
};

const RatingBar = ({ label, percentage }) => {
    return (
        <div className="progress-container">
            <div className="progress-header">
                <span className="progress-label">{label}</span>
                <span className="progress-value">{percentage}%</span>
            </div>
            <div className="progress-bar-bg">
                <div className="progress-bar" style={{
                    width: `${percentage}%`,
                    backgroundColor: '#4f46e5'
                }}></div>
            </div>
        </div>
    );
};

export default JewelryWorkshopApp;