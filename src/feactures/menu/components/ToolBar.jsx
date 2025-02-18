
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useForm } from '../../../hooks/useForm';

export const  ToolBar=({data})=> {

  const {setpage,totalPage}=data;
  const { formState, onInputChange, onResetForm, topage } = useForm({
    topage: '',
  
});
const changePage=()=>{

  if (topage >=1 &&  topage<=totalPage   ) {
    setpage(topage);
  } else {
    console.log('fuera de rango de paginas');
  }

}
console.log('topage:',topage);
  return (
    <>
      <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
     {/*    <ButtonGroup className="me-2" aria-label="First group">
          <Button variant="secondary">1</Button>{' '}
          <Button variant="secondary">2</Button>{' '}
          <Button variant="secondary">3</Button>{' '}
          <Button variant="secondary">4</Button>
        </ButtonGroup> */}
        <InputGroup>
          <InputGroup.Text 
          id="btnGroupAddon">
            @</InputGroup.Text>
          <Form.Control
            className='findPage'  
            type="text"
            placeholder="N° de pagina"
            aria-label="Ir a la pagina"
            aria-describedby="btnGroupAddon"
            maxlength="7"
            name="topage"    
            value={ topage }
            onChange={ onInputChange }
          />
          <Button variant="primary"
          onClick={changePage}
          >ir a pag</Button>{' '}
        </InputGroup>
      </ButtonToolbar>

     {/*  <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup aria-label="First group">
          <Button variant="secondary">1</Button>{' '}
          <Button variant="secondary">2</Button>{' '}
          <Button variant="secondary">3</Button>{' '}
          <Button variant="secondary">4</Button>
        </ButtonGroup>
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
          />
        </InputGroup>
      </ButtonToolbar> */}
    </>
  );
}