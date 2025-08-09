import React from 'react'

const QuestionsList = ({totalCount, setCurrentPage,handleSort, handleDelete, resources, currentPage, itemsPerPage, sortOrder, setEditParams, setUrl, setTitle}) => {
 console.log('resources inside',resources);
 
    return (
    <div className="container mt-5">
    <table className="table table-bordered table-hover table-striped">
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th onClick={handleSort} style={{ cursor: 'pointer' }}>
            Title {sortOrder === 'asc' ? '▲' : '▼'}
          </th>
          <th>URL</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {resources?.map((resource, index) => (
          <tr key={resource._id}>
            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
            <td>{resource.title}</td>
            <td>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                {resource.url}
              </a>
            </td>
            <td>
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={() => {
                  setEditParams({ isEdit: true, editId: resource?._id });
                  setUrl(resource?.url);
                  setTitle(resource?.title);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(resource?._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(totalCount / itemsPerPage) }).map(
                            (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            )
                        )}
                    </ul>
                </nav>
    </div>
  )
}

export default QuestionsList