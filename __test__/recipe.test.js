import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import recipe from "../src/pages/recipe"

import { FirebaseApp } from "firebase/app";
FirebaseApp.auth = authMock;

const authObjectMock = {
    createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
    signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
    fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => {
      Promise.resolve(true);
    }),
    onAuthStateChanged: jest.fn(),
    currentUser: {
      sendEmailVerification: jest.fn(() => Promise.resolve(true)),
    },
  };
  const authMock = jest.fn(() => authObjectMock);
  


test("should have save button", () => {
    render(<recipe />)
    const button = screen.getByRole("submit");
    expect(button).toBeInTheDocument()
})