import './App.css';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const baseUrl = 'https://guestlistandrea.herokuapp.com';

const headerStyle = css`
  background-color: rgb(150, 163, 131);
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  text-transform: uppercase;
  font-family: 'Kaushan Script', cursive;
  height: 2rem;
  padding-top: 4rem;
`;

const mainStyle = css`
  width: auto;
  min-height: 85vh;
  justify-content: center;
  font-size: calc(6px + 2vmin);
  color: white;
  font-family: 'Kaushan Script', cursive;
  background-image: linear-gradient(120deg, #e2c35d, #d88771);
  color: rgb(252, 252, 252);
`;

const inputTheGuest = css`
  line-height: 35px;
  width: 17%;
  margin-bottom: 15px;
  margin-right: 0.2rem;
  text-align: center;
  border-radius: 0.8rem;
`;

const guestListSmall = css`
  margin: 0 0 1rem 0;
`;

const title = css`
  font-size: 1.5rem;
  color: #a7766a;
`;

const guestsToInvite = css`
  text-align: center;
  padding: 5px 50px;
`;

const button = css`
  color: #fff !important;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 17px;
  margin-bottom: 20px;
  padding: 15px 20px;
  border: none;
  border-radius: 15px;
  background: rgb(150, 163, 131);
  transition: all 0.4s ease 0s;
  display: inline-block;

  :hover {
    background: rgb(150, 163, 131);
    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

const buttonDelete = css`
  color: #fff !important;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  font-size: 17px;
  margin-bottom: 20px;
  padding: 15px 20px;
  display: inline-block;
  border: none;
  border-radius: 15px;
  background: #a7766a;
  transition: all 0.4s ease 0s;

  :hover {
    background: red;

    letter-spacing: 3px;
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.4s ease 0s;
  }
`;

const table = css`
  min-width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: center !important;
  line-height: 30px;
  border-spacing: 15px 5px;
  margin-bottom: 40px;
  background-color: rgb(248, 245, 245);
  padding: 30px;
  border-radius: 1rem;
  border: 0.2rem solid #a7766a;
`;

const itemVisibility = css`
  color: gray;
  padding: 0.4rem;
`;

function App() {
  // Define the guestList array
  const [list, setList] = useState();

  // fetch gets API from the server, will rerender nonStop, in this case runs only once because of useEffect
  // From GIT "GET"
  useEffect(() => {
    const getList = async () => {
      const response = await fetch(`${baseUrl}/`);
      const data = await response.json();
      setList(data);
    };
    getList();
  }, []);

  // Guest List input fields
  const [fName, setFname] = useState('');
  const [lName, setLname] = useState('');
  const [checkboxes, setCheckboxes] = useState({});
  // Object.keys() returns an array of strings which are values of specific key of the object
  const checkboxKeys = Object.keys(checkboxes);
  console.log(list);

  if (!list) {
    return (
      <div
        style={{
          familyFont: 'Arial',
          fontWeight: '700',
          color: 'purple',
          fontSize: '40px',
          textAlign: 'center',
          marginTop: '20rem',
        }}
      >
        Loading...
      </div>
    );
  }
  // console.log(list);
  // to GET the list

  // when Submit button is clicked
  function handleSubmit(e) {
    e.preventDefault();

    // create a new guest from GIT "POST"
    async function newGuest() {
      const response = await fetch(`${baseUrl}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: fName,
          lastName: lName,
        }),
      });

      const createdGuest = await response.json();
      window.location.reload();
      return createdGuest;
    }

    newGuest();
  }

  // Delete button is clicked: From GIT "DELETE"

  function handleDelete() {
    async function deleteGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'DELETE',
      });

      const deletedGuest = await response.json();

      window.location.reload();
      return deletedGuest;
    }
    deleteGuest();
  }

  // Function which edits the data from GIT. "PATCH"
  function handleEdit() {
    async function editGuest() {
      const response = await fetch(`${baseUrl}/${checkboxKeys}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attending: true,
        }),
      });

      const updatedGuest = await response.json();

      window.location.reload();
      return updatedGuest;
    }
    editGuest();
  }

  return (
    <div className="App">
      <header css={headerStyle}>
        <h1>Guest List</h1>
      </header>
      <section css={mainStyle}>
        <div css={guestsToInvite}>
          <h2>Guests to invite:</h2>

          {/* Guests First and Last Name Input */}
          <form onSubmit={handleSubmit}>
            <input
              css={inputTheGuest}
              placeholder="First name"
              id="firstName"
              onChange={(e) => setFname(e.target.value)}
            />

            <input
              css={inputTheGuest}
              placeholder="Last name"
              id="lastName"
              onChange={(e) => setLname(e.target.value)}
            />
            <br />

            <button css={button}>Submit</button>
          </form>
        </div>
        <div css={guestsToInvite}>
          {/* Guest list Table */}
          <h2 css={guestListSmall}> Guest list:</h2>
          <table css={table}>
            <tbody>
              <tr>
                <th css={title}>Select</th>
                <th css={title}>Name</th>
                <th css={title}>Attending</th>
              </tr>
              {list.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="radio"
                      defaultChecked={checkboxes[item.id]}
                      onChange={() => {
                        setCheckboxes({ ...checkboxes, [item.id]: true });
                      }}
                    />
                  </td>
                  <td css={itemVisibility}>
                    {' '}
                    {item.firstName} {item.lastName}{' '}
                  </td>
                  <td css={itemVisibility}>{`*${item.attending}`}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button css={button} type="button" onClick={(e) => handleEdit(e)}>
            Confirm attendance
          </button>

          <br />

          <button
            css={buttonDelete}
            type="button"
            onClick={(item) => handleDelete(item.id)}
            id="delete"
          >
            Delete guest
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
