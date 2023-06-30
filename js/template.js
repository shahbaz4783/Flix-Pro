document.addEventListener('DOMContentLoaded', async () => {
  try {
    const footerResponse = await fetch('../views/footer.html');
    const footerData = await footerResponse.text();
    document.getElementById('footer').innerHTML = footerData;
  } catch (error) {
    console.log('An error occurred:', error);
  }
});