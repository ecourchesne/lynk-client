import Nav from '@/components/ui/nav'

const Dashboard = () => {
    return (
        <div className="w-cont mx-auto">
            <Nav />

            <div className="grid grid-cols-2 gap-4">
                <button className="card text-white font-normal">New Client</button>
                <button className="card text-white font-normal">Search Clients</button>
            </div>
        </div>
    )
}

export default Dashboard
