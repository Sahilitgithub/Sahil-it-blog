import Navbar from "../ui/dashboard/navbar/navbar"
import Sidebar from "../ui/dashboard/sidebar/sidebar"


const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <main className="grid grid-cols-12 h-screen">
      <aside className="bg-gray-950 text-white p-4 col-span-2">
        <Sidebar/>
      </aside>
      <div className="text-white col-span-10">
        <Navbar/>
        {children}
      </div>
    </main>
  )
}

export default Layout
