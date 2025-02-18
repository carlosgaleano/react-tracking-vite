import { ToolBar } from "./ToolBar";
import { SelectRowTable } from "./SelectRowTable";
import {useAuthStore} from '../../../feactures/auth/store/auth'; 

//import { compact } from "lodash/compact";
export const NavPagination = ({ data }) => {
 
  const { loading, setLoading } = useAuthStore();
  const {
    setpage,
    totalrow,
    totalPage,
    currentPage,
   
  } = data;


  const nextDisabled = currentPage === parseInt(totalPage)  ;
  const previosDisabled = currentPage === 1;

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
              
                setpage(currentPage - 1);
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
                
                setpage(currentPage + 1);
              }}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
          <li className="ml-1">
            <ToolBar data={{ setpage,totalPage }} />
          </li>

          <div className="d-inline border border-light rounded ml-1 mb-3">
            <li className="d-inline ml-1">
              <span>
                <strong> Item:</strong>
                {totalrow}
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
                <strong>Actual Page</strong> :{currentPage}
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
