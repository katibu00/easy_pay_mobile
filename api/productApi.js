const baseUrl = 'https://easypay.intelps.cloud';


const fetchCombos = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/combos`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


const fetchComboDetails = async (comboId) => {
  try {
    const response = await fetch(`${baseUrl}/api/combos/${comboId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching combo details:', error);
    throw error;
  }
};


export { fetchCombos, fetchComboDetails };
