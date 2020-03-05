export default (s, l = 27) => s && (s.slice(0,l) + (s.length > l ? '...' : ''))
