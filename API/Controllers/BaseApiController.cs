namespace API.Controllers;

using MediatR;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
   private IMediator? _mediator;

   protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                                        ?? throw new InvalidOperationException("IMediator service is unavailable");
}
