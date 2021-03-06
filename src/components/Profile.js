import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Card, Image, Statistic, Item, Loader, Button } from 'semantic-ui-react';
import styles from '../static/css/Profile.module.css';
import moment from 'moment';
import { getCountryName } from '../helper';
import {defaultImageUrl} from '../constant'

class Profile extends Component {

  componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      this.props.getUser(this.props.auth.login.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isLoggedIn !== prevProps.auth.isLoggedIn && this.props.auth.isLoggedIn) {
      this.props.getUser(this.props.auth.login.user.id);
    }
    else if (this.props.posts !== prevProps.posts) {
      this.props.getUser(this.props.auth.login.user.id);
    }
  }

  state = { open: false }
  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  renderItem(item, isRequest) {
    if (!isRequest) item = item.Post;
    return(
      <Item key={item.id}>
        <Item.Image size='tiny' src={item.item_image_url} />

        <Item.Content verticalAlign='middle'>
          <Item.Header as={Link} to={`item-detail/${item.id}`}>{item.item_name}</Item.Header>
          <Item.Meta>From {getCountryName(item.country_from)}</Item.Meta>
          { (isRequest && item.transactions.length !== 0) &&
            <Item.Description>
              {item.transactions.length} transactions
            </Item.Description>
          }
          <Item.Extra>Status: {item.status}</Item.Extra>
          <Item.Extra>{moment(item.createdAt).fromNow()}</Item.Extra>
          { isRequest &&
            <Item.Extra>
              <Button className={styles.deletePost} floated='right' size='mini'
                onClick={() => this.props.deletePost(item.id)}
              >Delete</Button>
              <Button className={styles.editPost} floated='right' size='mini'
                onClick={() => this.props.history.push(`/post-edit/${item.id}`)}
              >Edit</Button>
              { item.status === "ACCEPTED" &&
                <Button className={styles.completePost} floated='right' size='mini'
                  onClick={() => this.props.completePost(item.id)}
                >Mark as Completed</Button>
              }
            </Item.Extra>
          }
        </Item.Content>
      </Item>
    );
  }

  renderRequestsOrOfferings(list, isRequest) {
    return (
      <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.plannedTripTitle}>
                { isRequest? 'Requests' : 'Offerings' } ({list.length})
              </Header>
              { !list.length &&
                <p className={styles.titleSubheader}>There is no { isRequest? 'requests' : 'offerings' }.</p>
              }
            </Grid.Column>
          </Grid.Row>
          { list.length !== 0 &&
            <Grid.Row>
              <Grid.Column>
                <Item.Group className={styles.plannedTripContent} unstackable divided>
                  {_.orderBy(list, 'createdAt', 'desc').map((item) => {
                    return this.renderItem(item, isRequest);
                  })}
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
          }
      </Grid>
    );
  }

  render() {
    console.log(this.props);
    if (!this.props.auth.isLoggedIn) {
      return (
        <div className={styles.notLoggedIn}>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Header className={styles.title} as='h1'>
                  <span>You are not logged in.</span>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }

    if (_.isEmpty(this.props.users)) {
      return (
        <Loader />
      );
    }

    const currUser = this.props.users[this.props.auth.login.user.id];

    if (!currUser) {
      return (
        <Loader />
      );
    }

    const userStats = [
        { key: 'dealClosed', label: 'Deal Closed', value: currUser.deals_closed_count },
        { key: 'followers', label: 'Followers', value: currUser.followers_count },
        { key: 'following', label: 'Following', value: currUser.following.length },
    ]
    return (
      <div className={styles.container}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.title} as='h1'>
                <span>Profile</span>
                <Button className={styles.edit} floated='right' size='mini'
                  onClick={() => this.props.history.push(`/user-edit/${currUser.id}`)}
                >Edit</Button>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content>
                 { currUser.image_url ?
                   <Image floated='left' size='tiny' src={currUser.image_url} /> :
                   <Image floated='left' size='tiny' src={defaultImageUrl} />
                 }
                <Card.Header>
                  {currUser.username}
                  <Header.Subheader className={styles.rank}>
                    Joined {moment(currUser.createdAt).format("MMMM Do YYYY")}
                  </Header.Subheader>
                  </Card.Header>
                  <Card.Meta className={styles.bio}>
                    Take only memories, leave only footprints.
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Statistic.Group className={styles.statistics} widths='three' items={userStats} size='tiny' color='grey' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className={styles.subContainer}>
          {this.renderRequestsOrOfferings(currUser.posts_buy, true)}
          {this.renderRequestsOrOfferings(currUser.transactions_sell, false)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users,
    posts: state.posts
  };
}

export default connect(mapStateToProps, actions)(Profile);
