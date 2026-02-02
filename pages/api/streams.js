import { getProvider } from '../../providers/registry';
import { resolveImdbId } from '../../utils/resolveImdbId';

export default async function handler(req, res) {
  const { provider, type, tmdbId } = req.query;

  if (!['movie','series'].includes(type)) {
    return res.status(400).json({ success:false, error:'INVALID_TYPE' });
  }

  const prov = getProvider(provider);
  if (!prov) return res.status(404).json({ success:false, error:'PROVIDER_NOT_FOUND' });
  if (!prov.enabled) return res.status(503).json({ success:false, error:'PROVIDER_DISABLED' });

  try {
    const tmdbType = type === 'movie' ? 'movie' : 'tv';
    const imdbId = await resolveImdbId(tmdbType, tmdbId);

    let streams = await prov.fetch({ tmdbId, type, imdbId, filters:{} });
    res.status(200).json({ success:true, provider:prov.name, streams });
  } catch (err) {
    res.status(500).json({ success:false, error:err.message });
  }
}