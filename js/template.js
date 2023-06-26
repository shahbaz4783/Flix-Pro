document.addEventListener('DOMContentLoaded', async () => {
  try {
    const navResponse = await fetch('../views/nav.html');
    const navData = await navResponse.text();
    document.getElementById('navigation').innerHTML = navData;
    
    const footerResponse = await fetch('../views/footer.html');
    const footerData = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerData;
  } catch (error) {
    console.log('An error occurred:', error);
  }
});
