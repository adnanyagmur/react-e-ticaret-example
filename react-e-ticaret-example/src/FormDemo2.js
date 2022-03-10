import React, { Component } from 'react';
import alertify from "alertifyjs";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

class FormDemo2 extends Component {

    state = { email: "", password: "", city: "", description: "" }

    handleChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault();
        alertify.success(this.state.email +"  ADDED TO DB")
        alertify.success(this.state.password +"  ADDED TO DB")
        alertify.success(this.state.description +"  ADDED TO DB")
        alertify.success(this.state.city +"  ADDED TO DB")
    }


    render() {
        return (
            <div>

                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="email"> Email: </Label>
                        <Input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter EMAİL'
                            onChange={this.handleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password"> Password: </Label>
                        <Input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter Password'
                            onChange={this.handleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description"> Description: </Label>
                        <Input
                            type='textarea'
                            name='description'
                            id='description'
                            placeholder='Enter Description'
                            onChange={this.handleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='city'>City</Label>
                        <Input type="select" name='city' id='city' onChange={this.handleChange}>
                            <option>ANKARA</option>
                            <option>İSTANBUL</option>
                            <option>SİVAS</option>
                            <option>MERSİN</option>
                            <option>ADANA</option>
                        </Input>

                    </FormGroup>
                    <Button type='submit'>SAVE</Button>
                </Form>


            </div>
        );
    }
}

export default FormDemo2;