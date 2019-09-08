const sut = require('./index');

describe('Redirect', () => {
  test('When not given res, should throw error', () => {
    // Arrange
    // Act
    expect(() => sut())
    // Assert
      .toThrowError('Response object required');
  });

  test('When not given status code, should throw error', () => {
    // Arrange
    // Act
    expect(() => sut({}))
      // Assert
      .toThrowError('Status code required');
  });

  test('When not given location, should throw error', () => {
    // Arrange
    // Act
    expect(() => sut({}, 300))
    // Assert
      .toThrowError('Location required');
  });

  test('When given all args, should set statusCode and location', () => {
    // Arrange
    const statusCode = 302;
    const location = 'http://google.com';
    const res = {
      setHeader: jest.fn(),
      end: jest.fn()
    };

    // Act
    sut(res, statusCode, location);

    // Assert
    expect(res.statusCode).toBe(statusCode);
    expect(res.setHeader).toHaveBeenCalledWith('Location', location);
    expect(res.end).toHaveBeenCalled();
  });
});
