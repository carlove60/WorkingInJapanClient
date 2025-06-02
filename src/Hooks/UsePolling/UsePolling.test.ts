import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { usePolling } from "./usePolling"; // Adjust the import path as needed

describe("usePolling", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers(); // Use Jest's fake timers
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("calls the callback immediately when enabled is true", () => {
    const mockCallback = jest.fn();

    renderHook(() => usePolling(mockCallback, true)); // Hook runs here

    expect(mockCallback).toHaveBeenCalledTimes(1); // Callback runs immediately
  });

  it("calls the callback at intervals when enabled is true", () => {
    const mockCallback = jest.fn();

    renderHook(() => usePolling(mockCallback, true));

    act(() => {
      jest.advanceTimersByTime(3000); // Move time forward by 3 seconds
    });

    expect(mockCallback).toHaveBeenCalledTimes(4); // Immediately + 3 intervals
  });

  it("does not call the callback when enabled is false", () => {
    const mockCallback = jest.fn();

    renderHook(() => usePolling(mockCallback, false)); // Hook runs here

    // Time advances, but polling should not run since enabled is false
    act(() => {
      jest.advanceTimersByTime(3000); // Move time forward by 3 seconds
    });

    expect(mockCallback).not.toHaveBeenCalled(); // Callback should not be called
  });

  it("stops polling when enabled is toggled to false", () => {
    const mockCallback = jest.fn();

    const { rerender } = renderHook(({ callback, enabled }) => usePolling(callback, enabled), {
      initialProps: { callback: mockCallback, enabled: true },
    });

    act(() => {
      jest.advanceTimersByTime(2000); // Let 2 intervals complete
    });

    rerender({ callback: mockCallback, enabled: false }); // Disable polling

    act(() => {
      jest.advanceTimersByTime(2000); // Move time by 2 more seconds
    });

    expect(mockCallback).toHaveBeenCalledTimes(3); // 1 initial + 2 intervals
  });

  it("clears the interval when the component unmounts", () => {
    const mockCallback = jest.fn();

    const { unmount } = renderHook(() => usePolling(mockCallback, true));

    act(() => {
      jest.advanceTimersByTime(2000); // Let 2 intervals complete
    });

    unmount(); // Unmount the hook/component

    act(() => {
      jest.advanceTimersByTime(2000); // Move time forward by 2 seconds
    });

    expect(mockCallback).toHaveBeenCalledTimes(3); // 1 initial + 2 intervals
  });
});
