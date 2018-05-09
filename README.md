# About async&actions in redux

> Demo: https://async-redux.now.sh

> Boilerplate: https://github.com/Metnew/next-semantic-ui-react

## Real-life async action

When you work with async stuff you probably have next code in your
container:

```js
const mapStateToProps = state => ({userId: state.userId})
const mapDispatchToProps = dispatch => ({
  getUser(id) {
    dispatch(GET_USER(id))
  }
})
```

Where `GET_USER` is the next async action:

```javascript
export const GET_USER = id => async (dispatch, getState) => {
  const state = getState()
  // 1. Validate input before dispatching `pending`
  if (id === 111 && state.user === "Alex") {
    // 1.1 Do something if input is invalid
    const payload = {
      error: `You can't do it, because you're Alex and your id is 111`
    }
    dispatch({type: "GET_USER_FAIL", meta: id, payload, error: true})
    return {payload, status: {error: true}}
  }
  // 2. Dispatch `PENDING` action
  dispatch({type: "GET_USER_PENDING", meta: id})
  // 3. Create payload for async function
  const apiPayload = {id, token: state.token}
  // 4. Obtain result from async function
  const result = await getUserFromServer(apiPayload)

  // 5. Check is request successful or failed (contains errors).
  const status = result.ok && result !== 400 ? {success: true} : {error: true}
  // 6. Get data from request object (typically accessible as `result.data`)
  const payload = resultFromServer.data
  if (resultFromServer.ok) {
    // 7.if result successful -> dispatch `SUCCESS` action
    dispatch({type: "GET_USER_SUCCESS", meta: id, payload})
  } else {
    // 8.if result failed -> dispatch `FAIL` action
    dispatch({type: "GET_USER_FAIL", meta: id, payload, error: true})
  }

  // 9. Return values (typical case for Redux-form, but about it later)
  return {payload, status}
}
```

## Async action's lifecycle

* Validate input before dispatching `pending` and do something if input is invalid
* Dispatch `PENDING` action
* Create payload for async function
* Get result of async function
* Check is request successful or failed (contains errors).
* Get data from request object (typically accessible as `result.data`)
* if result successful -> dispatch `SUCCESS` action
* if result failed -> dispatch `FAIL` action
* Return values

> In a big projects duplicating this _lifecycle_ in each action isn't DRY. Imagine that you have 300 similar actions in your app. Much logic will be duplicated.

## Libs aimed to solve this problem

### promise-middleware

### redux-saga

### Author

Vladimir Metnew [vladimirmetnew@gmail.com](mailto:vladimirmetnew@gmail.com)

### LICENSE

Apache License 2.0
