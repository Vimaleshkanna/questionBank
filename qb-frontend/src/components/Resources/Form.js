import React from 'react'

const Form = ({handleUpdate, setTitle,title, setUrl,url}) => {
    return (
        <div className='d-flex flex-column justify-content-center p-5 w-50 border border-success'>
            <div className='d-flex align-items-start flex-column mb-3'>
                <label for="title-input" className='form-label'><h6>Title</h6></label>
                <input type="text" value={title} onChange={(e) => setTitle(e?.target?.value)} className='form-control' id="title-input" placeholder='Title of your question' />
            </div>
            <div className='d-flex align-items-start flex-column mb-5'>
                <label for="title-url" className='form-label'><h6>URL</h6></label>
                <input type="text" value={url} onChange={(e) => setUrl(e?.target?.value)} className='form-control' id="title-url" placeholder='URL of your question' />
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button type='button' className='btn btn-primary' onClick={handleUpdate}>Submit</button>
            </div>
        </div>
    )
}

export default Form