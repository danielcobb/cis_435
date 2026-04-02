const myName = process.argv[2] || "Guest";
const age = process.argv[3] || "Unknown"

console.log(`Hello ${myName}, you're ${age} years old.`);