import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Pagination } from "@/components/Pagination";

test("Page 1: shows items 1-20 of 51, enables next, disables previous", () => {
  render(<Pagination currentPage={1} totalItems={51} category="characters" />);

  // Position Indicator
  expect(screen.getByTestId("position-indicator")).toHaveTextContent(
    "1 - 20 of 51"
  );

  // Previous Button
  expect(screen.getByTestId("link-prev-disabled")).toBeVisible();

  // Next Button
  expect(screen.getByTestId("link-next")).toBeVisible();
  expect(screen.getByTestId("link-next")).toHaveAttribute(
    "href",
    "/discover/characters?page=2"
  );
});

test("Page 2: shows items 21-40 of 51, enables both previous and next buttons", () => {
  render(<Pagination currentPage={2} totalItems={51} category="characters" />);

  // Position Indicator
  expect(screen.getByTestId("position-indicator")).toHaveTextContent(
    "21 - 40 of 51"
  );

  // Previous Button
  expect(screen.getByTestId("link-prev")).toBeVisible();
  expect(screen.getByTestId("link-prev")).toHaveAttribute(
    "href",
    "/discover/characters?page=1"
  );

  // Next Button
  expect(screen.getByTestId("link-next")).toBeVisible();
  expect(screen.getByTestId("link-next")).toHaveAttribute(
    "href",
    "/discover/characters?page=3"
  );
});

test("Last page: shows remaining items, enables previous, disables next", () => {
  render(<Pagination currentPage={3} totalItems={51} category="characters" />);

  // Position Indicator
  expect(screen.getByTestId("position-indicator")).toHaveTextContent(
    "41 - 51 of 51"
  );
  // Previous Button
  expect(screen.getByTestId("link-prev")).toBeVisible();
  expect(screen.getByTestId("link-prev")).toHaveAttribute(
    "href",
    "/discover/characters?page=2"
  );

  // Next Button
  expect(screen.getByTestId("link-next-disabled")).toBeVisible();
});

test("Beyond range: does not render the component", () => {
  const { container } = render(
    <Pagination currentPage={49} totalItems={51} category="characters" />
  );

  expect(container).toBeEmptyDOMElement();
});
