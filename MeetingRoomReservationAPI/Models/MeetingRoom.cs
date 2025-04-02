using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MeetingRoomReservationAPI.Models
{
    public class MeetingRoom
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string Name { get; set; } = null!;
        public int Capacity { get; set; }
        public List<string> Equipment { get; set; } = new();
    }
}
