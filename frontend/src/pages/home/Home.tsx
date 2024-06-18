import Sidebar from '@/components/Sidebar'
import { CommonContext } from '@/context'
import { getBooks } from '@/services/book'
import { format } from 'date-fns'
import { DataTable, DataTableColumn } from 'mantine-datatable'
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { BiSearch } from 'react-icons/bi'

const Home: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [searchKey, setSearchKey] = useState<string>("")

    const { user, books, setBooks, setMeta, meta } = useContext(CommonContext)

    const columns: DataTableColumn[] = [
        {
            accessor: 'id',
            title: '#',
            sortable: true
        },
        {
            accessor: 'name',
            title: 'Name',
            sortable: true
        },
        {
            accessor: 'author',
            title: 'Author',
            sortable: true
        },
        {
            accessor: 'publisher',
            title: 'Publisher'
        },
        {
            accessor: 'publicationYear',
            title: 'Publication Year'
        },
        {
            accessor: 'subject',
            title: 'Subject',
        },
        {
            accessor: 'createdAt',
            title: 'Created At',
            sortable: true,
            render: ({ createdAt }) => (
                <span>
                    {format(new Date(createdAt as string), 'MMM dd, yyyy')}
                </span>
            )
        }
    ]

    useEffect(() => {
        getBooks({ page, limit, setLoading, setMeta, setBooks, searchKey })
    }, [page, limit, searchKey])

    return (
        <div className='w-full flex min-h-screen'>
            <Sidebar />
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className='w-10/12 flex flex-col px-14 pt-8'>
                <span className='text-lg font-semibold'>Welcome {user.names}</span>
                <div className='my-14'>
                    <div className='w-full justify-between flex mb-6'>
                        <span className='my-8 text-xl'>Books in RCA LMS</span>
                        <div className="bg-white w-3/12 rounded-3xl flex items-center relative h-12 justify-between" >
                            <input placeholder='Search here...' type="text" className="outline-0 rounded-3xl bg-inherit w-10/12 p-2 pl-6" onChange={(e) => setSearchKey(e.target.value)} />
                            <button onClick={() => {
                                getBooks({ page, limit, setLoading, setMeta, setBooks, searchKey })
                            }} className='absolute top-1 mx-auto bottom-1 right-2 bg-primary-blue w-10 h-10 rounded-full flex items-center justify-center'>
                                <BiSearch color='white' size={25} />
                            </button>
                        </div>
                    </div>
                    <DataTable
                        records={books as unknown as Record<string, unknown>[]}
                        columns={columns}
                        page={page}
                        recordsPerPage={limit}
                        loadingText={loading ? 'Loading...' : "Rendering..."}
                        onPageChange={(page) => setPage(page)}
                        onRecordsPerPageChange={(limit: number) => setLimit(limit)}
                        recordsPerPageOptions={limit === 10 ? [5, 10, 20, 50] : [limit]}
                        withTableBorder
                        borderRadius="sm"
                        withColumnBorders
                        striped
                        totalRecords={meta?.total}
                        highlightOnHover
                        onRowClick={({ record: { title } }) =>
                            toast.success(`${title} clicked!`)
                        }
                        noRecordsText="No records found"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home