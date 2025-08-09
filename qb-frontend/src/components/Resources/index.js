import React, { useEffect, useState } from 'react'
import Form from './Form'
import QuestionsList from './QuestionsList'
import axios from 'axios'


const Resources = () => {
    const API = process.env.REACT_APP_API_URL

    const [resources, setResources] = useState([])
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [editParams, setEditParams] = useState({ isEdit: false, editId: '' })
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)

    const itemsPerPage = 5;

    useEffect(() => {
        fetchResources()
    }, [currentPage])

    const fetchResources = async () => {
        try {
            const res = await axios.get(`${API}/getResources/${currentPage}`)
            if (res) {
                setResources(res.data.data)
                setTotalCount(res.data.totalCount);
            }
        } catch (error) {
            console.log('error', error);

        }
    }

    const handleUpdate = async () => {
        try {
            if (editParams?.isEdit) {
                const res = await axios.put(`${API}/${editParams.editId}`, { title, url })
                if (res) fetchResources()
            }
            else {
                const res = await axios.post(`${API}`, { title, url })
                if (res) fetchResources()
            }
            setEditParams({ isEdit: false, editId: "" })
        } catch (error) {
            console.log('error in add/update', error)
            setEditParams({ isEdit: false, editId: "" })

        }
    }
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${API}/${id}`)
            if (res) fetchResources()
        } catch (error) {
            console.log('error in delete', error)
        }
    }
    console.log('res', totalCount);
    const handleSort = () => {
        const sorted = [...resources].sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (sortOrder === "asc") return titleA.localeCompare(titleB);
            else return titleB.localeCompare(titleA);
        });

        setResources(sorted);
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    return (
        <div className='container'>
            <h1>Bank your questions and Use it whenever.....</h1>
            <div className='d-flex justify-content-center mt-5'>
                <Form handleUpdate={handleUpdate} title={title} setTitle={setTitle} url={url} setUrl={setUrl}/>
            </div>
            {resources?.length ? <div className="d-flex justify-content-center mt-5">
                <QuestionsList setCurrentPage={setCurrentPage} totalCount={totalCount} handleUpdate={handleUpdate} handleDelete={handleDelete} handleSort={handleSort} resources={resources} sortOrder={sortOrder} currentPage={currentPage} itemsPerPage={itemsPerPage} />

            </div> : null
            }
        </div>
    )
}

export default Resources