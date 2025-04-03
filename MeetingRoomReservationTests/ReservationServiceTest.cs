using Xunit;
using Moq;
using MongoDB.Driver;
using MeetingRoomReservationAPI.Models;
using MeetingRoomReservationAPI.Services;

namespace MeetingRoomReservationTests
{
    public class ReservationServiceTest
    {
        private readonly Mock<IMongoCollection<Reservation>> _mockCollection;
        private readonly ReservationService _service;

        public ReservationServiceTest()
        {
            _mockCollection = new Mock<IMongoCollection<Reservation>>();
            _service = new ReservationService(_mockCollection.Object);
        }

        private Mock<IAsyncCursor<Reservation>> MockAsyncCursor(IEnumerable<Reservation> reservations)
        {
            var mockCursor = new Mock<IAsyncCursor<Reservation>>();
            mockCursor.Setup(_ => _.Current).Returns(reservations);
            mockCursor.SetupSequence(_ => _.MoveNext(It.IsAny<CancellationToken>()))
                      .Returns(true)
                      .Returns(false);
            mockCursor.SetupSequence(_ => _.MoveNextAsync(It.IsAny<CancellationToken>()))
                      .ReturnsAsync(true)
                      .ReturnsAsync(false);
            return mockCursor;
        }

        [Fact]
        public async Task IsOverlappingReservationAsync_ShouldReturnTrue_IfOverlapExists()
        {
            
            var existingReservation = new Reservation
            {
                RoomId = "room1",
                StartTime = new DateTime(2025, 4, 3, 10, 0, 0),
                EndTime = new DateTime(2025, 4, 3, 11, 0, 0)
            };

            var reservations = new List<Reservation> { existingReservation };
            var mockCursor = MockAsyncCursor(reservations);

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Reservation>>(),
                It.IsAny<FindOptions<Reservation, Reservation>>(),
                It.IsAny<CancellationToken>()
            )).ReturnsAsync(mockCursor.Object);

            
            var result = await _service.IsOverlappingReservationAsync(
                "room1",
                new DateTime(2025, 4, 3, 10, 30, 0),
                new DateTime(2025, 4, 3, 11, 30, 0)
            );

            
            Assert.True(result);
        }

        [Fact]
        public async Task IsOverlappingReservationAsync_ShouldReturnFalse_IfNoOverlap()
        {
            
            var reservations = new List<Reservation>();
            var mockCursor = MockAsyncCursor(reservations);

            _mockCollection.Setup(c => c.FindAsync(
                It.IsAny<FilterDefinition<Reservation>>(),
                It.IsAny<FindOptions<Reservation, Reservation>>(),
                It.IsAny<CancellationToken>()
            )).ReturnsAsync(mockCursor.Object);

            
            var result = await _service.IsOverlappingReservationAsync(
                "room1",
                new DateTime(2025, 4, 3, 12, 0, 0),
                new DateTime(2025, 4, 3, 13, 0, 0)
            );

            
            Assert.False(result);
        }
    }
}
