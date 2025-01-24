const Loading = () => {
    return (
      <div  >
        <div class="d-flex justify-content-center  mb-3">
          <div class="p-2 "></div>
          <div class="p-2  loader">
          
          </div>
          <div class="p-2 "></div>
        </div>
        <br />
        <div class="d-flex justify-content-center mb-3">
          <div class="p-2 "></div>
          <div class="p-2 ">
            <button class="btn btn-muted" disabled>
              <span class="spinner-grow spinner-grow-sm"></span>
              Cargando...
            </button>
          </div>
          <div class="p-2 "></div>
        </div>
  
        
      </div>
    );
  };

export default Loading;