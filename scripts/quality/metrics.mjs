export function median(values) {
  if (values.length !== 3 || values.some((value) => !Number.isFinite(value))) {
    throw new Error('Expected exactly three finite measurements');
  }
  return [...values].sort((a, b) => a - b)[1];
}

export function evaluate(samples, profile, budgets, baselineJsBytes) {
  const required = [
    ...Object.keys(budgets[profile]),
    'lcpMs',
    'cls',
    'tbtMs',
    'firstLoadJsBytes',
    'lcpMediaBytes',
  ];
  const metrics = Object.fromEntries(
    required.map((key) => [key, median(samples.map((sample) => sample[key]))]),
  );
  const failures = [];
  for (const [category, minimum] of Object.entries(budgets[profile])) {
    if (metrics[category] < minimum)
      failures.push(`${category}: ${metrics[category]} < ${minimum}`);
  }
  for (const key of [
    'lcpMs',
    'cls',
    'tbtMs',
    'firstLoadJsBytes',
    'lcpMediaBytes',
  ]) {
    if (metrics[key] > budgets[key])
      failures.push(`${key}: ${metrics[key]} > ${budgets[key]}`);
  }
  if (
    baselineJsBytes !== undefined &&
    metrics.firstLoadJsBytes - baselineJsBytes > budgets.reviewIncreaseJsBytes
  ) {
    failures.push(
      `JavaScript increase requires documented review: ${metrics.firstLoadJsBytes - baselineJsBytes} bytes`,
    );
  }
  return { metrics, failures };
}

export function lcpMediaBytes(node, images, requests) {
  const image = images.find((item) => item.node.devtoolsNodePath === node.path);
  if (!image) {
    if (/^<img\b/.test(node.snippet))
      throw new Error('LCP image was not resolved');
    return 0;
  }
  const request = requests.find((item) => item.url === image.src);
  if (
    !request ||
    !Number.isFinite(request.transferSize) ||
    request.transferSize <= 0
  )
    throw new Error('LCP media transfer could not be measured');
  return request.transferSize;
}
