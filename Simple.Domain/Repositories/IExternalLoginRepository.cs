﻿using Simple.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Simple.Domain.Repositories
{
	public interface IExternalLoginRepository : IRepository<ExternalLogin>
	{
		ExternalLogin GetByProviderAndKey(string loginProvider, string providerKey);
		Task<ExternalLogin> GetByProviderAndKeyAsync(string loginProvider, string providerKey);
		Task<ExternalLogin> GetByProviderAndKeyAsync(CancellationToken cancellationToken, string loginProvider, string providerKey);
	}
}