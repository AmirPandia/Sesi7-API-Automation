const { describe } = require("mocha");
const assert = require("assert");
const { expect } = require("chai");

let token;

describe("Test API Belajar Bareng", function () {
  it("Valid Login", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "admin",
          password: "admin",
        }),
      }
    );

    expect(response.status).to.equal(200);

    const data = await response.json();
    // console.log("Response Login:", data); 
    expect(data.message).to.eql("Login successful");

    // Simpan Token
    token = data.token;
    // console.log("Token berhasil disimpan:", token);
  });

  it("Get User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/users",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Diubah menjadi 'Authorization'
        },
      }
    );

    expect(response.status).to.equal(200);

    const data = await response.json();
    // console.log("Response Get User:", data);
  });

//   Positif Case
  it("Add User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          username: "Gober",
          age: 22,
        }),
      }
    );

    expect(response.status).to.equal(201);

    const data = await response.json();
    // console.log("Response Add User:", data);
    expect(data.message).to.eql("User successfully added, Hi Gober!");
  });

// Negatif Case
  it("Add User", async function () {
    const response = await fetch(
      "https://belajar-bareng.onrender.com/api/add-user",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        method: "POST",
        body: JSON.stringify({
          username: "Gober",
          age: "DuaDua",
        }),
      }
    );

    expect(response.status).to.equal(201);

    const data = await response.json();
    // console.log("Response Add User:", data);
    expect(data.message).to.eql("User successfully added, Hi Gober!");
  });
});