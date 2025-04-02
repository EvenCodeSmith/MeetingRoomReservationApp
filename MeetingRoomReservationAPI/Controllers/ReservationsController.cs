// Controllers/ReservationsController.cs
using MeetingRoomReservationAPI.Models;
using MeetingRoomReservationAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace MeetingRoomReservationAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly ReservationService _reservationService;

        public ReservationsController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> Get() =>
            await _reservationService.GetAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> Get(string id)
        {
            var res = await _reservationService.GetAsync(id);
            if (res == null) return NotFound();
            return res;
        }

        [HttpPost]
        public async Task<IActionResult> Create(Reservation reservation)
        {
            if (reservation.EndTime <= reservation.StartTime)
                return BadRequest("Endzeit muss nach Startzeit sein.");

            var overlapping = await _reservationService.IsOverlappingReservationAsync(
                reservation.RoomId, reservation.StartTime, reservation.EndTime
            );

            if (overlapping)
                return Conflict("Der Raum ist zu diesem Zeitpunkt bereits reserviert.");

            await _reservationService.CreateAsync(reservation);
            return CreatedAtAction(nameof(Get), new { id = reservation.Id }, reservation);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var res = await _reservationService.GetAsync(id);
            if (res == null) return NotFound();

            await _reservationService.DeleteAsync(id);
            return NoContent();
        }
    }
}
