import Alert from 'react-bootstrap/Alert';

function AlertLogin(setAlertShow,alertShow) {

    const variant = 'danger';
   

  return (
    <>
     
        <Alert className='w-10 h-10 mr-5' key={variant} variant={variant}>
          Los datos de acceso al Sistema son incorrectos
        </Alert>
   
    </>
  );
}

export default AlertLogin;