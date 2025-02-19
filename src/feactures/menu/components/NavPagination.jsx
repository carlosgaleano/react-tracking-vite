import { ToolBar } from "./ToolBar";
import { SelectRowTable } from "./SelectRowTable";
import { useDespachosStore } from "../../tracking/store/despachos";
//import { compact } from "lodash/compact";
export const NavPagination = () => {
 
  const {  setData, page, setPage,totalRows, totalPage,setTotalPage, loading, setLoading } = useDespachosStore();
 


  const nextDisabled = page === parseInt(totalPage)  ;
  const previosDisabled = page === 1;

  console.log('estado ',previosDisabled);


  return (
    <>
      <nav
      style={{ display: loading ? 'none' : 'block' }}
      
      >
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => {
              
                setPage(page - 1);
              }}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              Previous
            </button>
          </li>

          <li className="page-item">
            <button
              className="ml-1 page-link "
              onClick={() => {
                
                setPage(page + 1);
              }}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
          <li className="ml-1">
            <ToolBar  />
          </li>

          <div className="d-inline border border-light rounded ml-1 mb-3">
            <li className="d-inline ml-1">
              <span>
                <strong> Item:</strong>
                {totalRows}
              </span>
            </li>
            <li className="d-inline ml-1">
              <span>
                {" "}
                <strong>Paginas</strong> :{totalPage}
              </span>
            </li>
            <li className="d-inline ml-1">
              <span>
                <strong>Actual Page</strong> :{page}
              </span>
            </li>
            <li className="d-inline ml-1">
              {" "}
             <span ><SelectRowTable  />{" "}</span> 
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
