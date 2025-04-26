// const queryGenerate = (data) => {
//   let keys = Object.keys(data);
//   return keys.join("=?") + "=?";
// };

// module.exports = queryGenerate;

const queryGenerate = (data) => {
  // Check if data is valid (not null or undefined)
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data: data must be a non-null object");
  }

  // Get the keys of the data object
  let keys = Object.keys(data);

  // If there are no keys, throw an error
  if (keys.length === 0) {
    throw new Error("No data to update");
  }

  // Generate the SET clause with parameterized placeholders
  return keys.map((key) => `${key}=?`).join(", ");
};

module.exports = queryGenerate;
