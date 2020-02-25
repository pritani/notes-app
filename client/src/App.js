import React from 'react'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'

import NotesList from './Notes/List'
import NoteNew from './Notes/New'
import NotesShow from './Notes/Show'
import NotesEdit from './Notes/Edit'

import CategoryList from './Categories/List'
import CategoryShow from './Categories/Show'
import CategoryEdit from './Categories/Edit'
function App(props){
    return(
  <BrowserRouter>
  <div>
  <h1>Welcome to the notes</h1>
<Link to="/notes">Notes</Link>
<Link to="/categories">Categories</Link>
<Switch>
  <Route path="/notes" component={NotesList} exact={true}/>
<Route path="/notes/new" component={NoteNew} exact={true}/>
<Route path="/notes/:id" component={NotesShow} exact={true}/>
<Route path="/notes/edit/:id" component={NotesEdit} exact={true}/>
<Route path="/categories" component={CategoryList} exact={true}/>
<Route path="/categories/:id" component={CategoryShow} exact={true}/>
<Route path="/categories/edit/:id" component={CategoryEdit} exact={true}/>
</Switch>
  </div>
  </BrowserRouter>
    )
    }
export default App