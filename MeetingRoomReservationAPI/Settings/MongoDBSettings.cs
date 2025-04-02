namespace MeetingRoomReservationAPI.Settings
{


    public class MongoDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string MeetingRoomsCollectionName { get; set; } = null!;
        public string ReservationsCollectionName { get; set; } = null!;
    }

}