import React, { Component } from 'react';
import {
  Container,
  Input,
  Label,
  FormGroup,
  Button,
  Row,
  Col
} from 'reactstrap';
import Table from '../Table/table';
import List from '../List/List';
import Wrapper from '../p5/Wrapper';
import CTable from '../Converted/CTable';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: false,
      list: false,
      input: {},
      direcionado: true,
      valorado: false,
      showConvertedTable: false,
      show: false
    };
    this.setTable = this.setTable.bind(this);
    this.setList = this.setList.bind(this);
    this.gerarGrafo = this.gerarGrafo.bind(this);
  }
  setTable() {
    document.getElementById('select').value !== '...' &&
    document.getElementById('radio').checked !== false
      ? this.setState({ table: true, list: false })
      : this.setState({ table: false });
  }
  setList() {
    document.getElementById('select').value !== '...' &&
    document.getElementById('radio2').checked !== false
      ? this.setState({ list: true, table: false })
      : this.setState({ list: false });
  }
  gerarGrafo(clickedL, indexL) {
    let select = document.getElementById('select').value;
    let input = document.getElementsByClassName('input');
    let array = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: []
    };
    const alf = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let j = -1;
    for (let i = 0; i < input.length; i++) {
      if (i % select == 0) {
        j++;
      }

      array[alf[j]].push(
        this.state.valorado ? input[i].value : input[i].checked
      );
      // console.log(alf[j] + ' =  ' + input[i].value);
      // console.log(array);
    }

    // TALVEZ DPOIS :)
    // const objList = {};
    // let letterIndex = 0;
    // for (const l in array) {
    //   if (array[l].length !== 0) {
    //     if (!this.state.direcionado && !this.state.valorado) {
    //       for (let i = 0; i < array[l].length; i++) {
    //         if (array[l][i]) {
    //           array[String.fromCharCode(65 + i)][letterIndex] = true;
    //         }
    //       }
    //     }

    //     objList[l] = array[l];
    //   }
    //   letterIndex++;
    // }

    // if (clickedL && indexL) {
    //   if (objList[clickedL][indexL]) {
    //     objList[clickedL][indexL] = false;

    //     // pega a letra do index d indexL (o q foi clicado) e dpois pega a letra da row e transforma em numero
    //     objList[String.fromCharCode(65 + indexL)][
    //       clickedL.charCodeAt(0) - 65
    //     ] = false;
    //   }
    // }

    const objList = {};
    for (const l in array) {
      if (array[l].length !== 0) {
        objList[l] = array[l];
      }
    }

    this.setState({ input: objList, showConvertedTable: true, show: true });
  }
  handleCheckbox = (e, key) => {
    this.setState({ [key]: e.target.checked });
  };
  render() {
    const { direcionado, valorado, showConvertedTable, input } = this.state;
    return (
      <Container style={{ marginTop: '100px' }}>
        <Row>
          <Col xs={4}>
            <FormGroup>
              <Label>Numero de Vertices</Label>
              <Input
                type='select'
                onChange={this.setTable}
                onChange={this.setList}
                name='select'
                id='select'
              >
                <option>...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup tag='fieldset'>
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                id='radio'
                onChange={this.setTable}
                name='radio1'
              />{' '}
              Matriz Adjacente
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type='radio'
                id='radio2'
                onChange={this.setList}
                name='radio1'
              />{' '}
              Lista Adjacente
            </Label>
          </FormGroup>
          <FormGroup check style={{ marginLeft: '30px' }}>
            <Label check>
              <Input
                type='checkbox'
                defaultChecked={direcionado}
                onChange={e => this.handleCheckbox(e, 'direcionado')}
                onc
              />
              direcionado
            </Label>
          </FormGroup>
          <FormGroup style={{ marginLeft: '50px' }}>
            <Label check>
              <Input
                type='checkbox'
                defaultChecked={valorado}
                onChange={e => this.handleCheckbox(e, 'valorado')}
              />
              valorado
            </Label>
          </FormGroup>
        </FormGroup>
        {this.state.table ? (
          <Table
            grafoGerado={this.state.input}
            gerarGrafo={this.gerarGrafo}
            direcionado={direcionado}
            valorado={valorado}
            n={document.getElementById('select').value}
          />
        ) : (
          ''
        )}

        {this.state.list ? (
          <List
            direcionado
            valorado
            n={document.getElementById('select').value}
          />
        ) : (
          ''
        )}
        <Button onClick={this.gerarGrafo}>Gerar Grafo</Button>

        {showConvertedTable && <CTable inputs={input} />}
        {this.state.show ? <Wrapper inputs={this.state.input} /> : ''}
      </Container>
    );
  }
}
