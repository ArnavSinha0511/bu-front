let userData = [];


async function getData() {
    const url = "https://raw.githubusercontent.com/buildingu/Mock_Admin_Panel_Data/refs/heads/main/api/v1/users/users.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      userData = json;

    } catch (error) {
      console.error(error.message);
    }
  }

//Wait for data to be fetched then assign to userData
async function assign(){
    await getData();
    console.log(userData);
}

assign();