import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Header, Form, Divider, Input, Image, Button } from 'semantic-ui-react';
import styles from '../static/css/OfferToHelp.module.css';

const paymentOptions = [
    { key: 'PayPal', text: 'PayPal', value: 'PayPal' },
    { key: 'Bank Transfer', text: 'Bank Transfer', value: 'Bank Transfer' },
    { key: 'Others', text: 'Others', value: 'Others' },
];

const deliveryOptions = [
    { key: 'RegisteredMail', text: 'Registered Mail', value: 'RegisteredMail' },
    { key: 'NormalMail', text: 'Normal Mail', value: 'NormalMail' },
    { key: 'Others', text: 'Others', value: 'Others' },
];

class OfferToHelp extends Component {
    state = {};

    handleSubmit() {
        this.props.acceptPost(this.state);
        this.props.history.push('/');
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    isValid() {
        let { state } = this;
        if (Object.keys(state).length !== 4) return false;
        for (let key of Object.keys(state)) {
          if (state[key] === "") return false;
        }
        return true;
    }

    render() {
        let isValid = this.isValid();

        return (
        <div className={styles.wrapperContainer}>
            <div className={styles.container}>    
                <Grid container>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src='https://www.marltonjoecanals.com/images/sites/marltonjoecanals/labels/modelo-modelo-6-pack-bottles_1.jpg' />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Header className={styles.white}>
                                <span>Stockholms Branneri Dry Gin</span><br/>
                                <br/>
                                <span>Willing to pay </span>
                                <span className={styles.amount}>$100</span>
                                <Header.Subheader className={styles.white}>
                                        <span>Buy from </span>
                                        <span className={styles.dealLocation}>Sweden</span>
                                        <span>, deal in </span>
                                        <span className={styles.dealLocation}>Singapore</span>
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider />
                <div>
                    <div className={styles.details}>
                        <Form>
                            <Form.Field>
                                <label className={styles.white}>Offer Price </label>
                                <Input className={styles.input} name="offer-price" onChange={this.handleChange} required placeholder='$100' />
                            </Form.Field>
                            <Divider />
                            <Form.Field>
                                <label className={styles.white}>Return Date </label>
                                <Input name="return-date" onChange={this.handleChange} required placeholder='16-09-2018' />
                            </Form.Field>
                            <Divider />
                            <Form.Field>
                                <label className={styles.white}>Payment Method</label>
                                <Form.Select name="payment-method" onChange={this.handleChange} required fluid options={paymentOptions} placeholder='Choose' />
                            </Form.Field>
                            <Divider />
                            <Form.Field>
                                <label className={styles.white}>Delivery Method</label>
                                <Form.Select name="delivery-method" onChange={this.handleChange} required className={styles.dropdown} fluid options={deliveryOptions} placeholder='Choose' />
                            </Form.Field>
                            <Divider />
                            <Button disabled={!isValid} onClick={() => this.handleSubmit()} fluid positive type='submit'>Confirm</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        );
    };
};

function mapStateToProps(state) {
    return {
    };
  }
  
  export default connect(mapStateToProps, actions)(OfferToHelp);