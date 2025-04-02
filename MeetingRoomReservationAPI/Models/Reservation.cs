using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MeetingRoomReservationAPI.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string RoomId { get; set; } = null!;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ReservedBy { get; set; } = null!;
        public string Purpose { get; set; } = null!;
    }
}
