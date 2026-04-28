class AppLog {
  // Var member list
  level;
  timeZone;
  logs = [];

  // Static level map - resolves numeric level from entry type string
  static #LEVEL_MAP = {
    FATAL:   0,
    ERROR:   0,
    WARN:    1,
    LOG:     2,
    SUCCESS: 3,
    FAIL:    3,
    READY:   3,
    START:   3,
    INFO:    3,
    DEBUG:   4,
    TRACE:   5,
  };

  /**
   * Creates an instance of AppLog.
   *
   * Log levels:
   * 0 - Fatal and Error
   *
   * 1 - Warning
   *
   * 2 - Normal logs
   *
   * 3 - Informational logs, success, fail, ready, start, ...
   *
   * 4 - Debug logs
   *
   * 5 - Trace logs
   *
   * -999 - Silent
   *
   * 999 - Verbose
   *
   * @param {string} timeZone - The time zone to use for log timestamps (e.g., 'UTC', 'Asia/Jakarta').
   * @param {number} level - The log level to set for this logger instance (default is 2).
   */
  constructor(timeZone, level = 2) {
    this.timeZone = timeZone;
    this.level = level;
  }

  // Private methods

  /**
   * Returns the current timestamp formatted in the instance's time zone.
   * @returns {string} - Formatted timestamp (e.g., 'MM/DD/YYYY, HH:MM:SS').
   */
  #timestamp() {
    return new Date().toLocaleString("en-US", {
      timeZone: this.timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }

  /**
   * Core method - appends an entry to `logs` when the instance level allows it.
   * @param {string} type    - Label shown in the entry (e.g. 'ERROR', 'DEBUG').
   * @param {number} needed  - Minimum level required to record this entry.
   * @param {*}      msg     - The message or value to log.
   * @param {*}     [meta]  - Optional extra data attached to the entry.
   */
  #append(type, needed, msg, meta) {
    if (this.level === -999) return; // silent - drop everything
    if (this.level !== 999 && this.level < needed) return; // level gate

    const entry = {
      time: this.#timestamp(),
      type,
      message: msg,
      details: meta ? meta : null
    };

    this.logs.push(entry);
  }

  // Public methods

  /** Level 0 - fatal: application cannot continue. */
  fatal(msg, meta) {
    this.#append("FATAL", 0, msg, meta);
  }

  /** Level 0 - error: something went wrong but execution can continue. */
  error(msg, meta) {
    this.#append("ERROR", 0, msg, meta);
  }

  /** Level 1 - warning: unexpected situation, not yet an error. */
  warn(msg, meta) {
    this.#append("WARN", 1, msg, meta);
  }

  /** Level 2 - normal general-purpose log. */
  log(msg, meta) {
    this.#append("LOG", 2, msg, meta);
  }

  /** Level 3 - success confirmation. */
  success(msg, meta) {
    this.#append("SUCCESS", 3, msg, meta);
  }

  /** Level 3 - failure that is handled / expected. */
  fail(msg, meta) {
    this.#append("FAIL", 3, msg, meta);
  }

  /** Level 3 - a service / component is ready. */
  ready(msg, meta) {
    this.#append("READY", 3, msg, meta);
  }

  /** Level 3 - a process is starting. */
  start(msg, meta) {
    this.#append("START", 3, msg, meta);
  }

  /** Level 3 - informational note. */
  info(msg, meta) {
    this.#append("INFO", 3, msg, meta);
  }

  /** Level 4 - debug detail, shown in development. */
  debug(msg, meta) {
    this.#append("DEBUG", 4, msg, meta);
  }

  /** Level 5 - fine-grained trace, shows full execution path. */
  trace(msg, meta) {
    this.#append("TRACE", 5, msg, meta);
  }

  // Utility methods

  /**
   * Returns a copy of recorded entries filtered by the current instance level.
   * Mirrors the same gate used when appending:
   *   -999 (silent)  - always empty
   *    999 (verbose) - all entries
   *   otherwise      - entries whose level ≤ this.level
   *
   * @param {string} [type] - Optional extra filter by type label, e.g. 'ERROR', 'DEBUG'.
   * @returns {object[]}
   */
  getLogs(type) {
    // Silent mode - nothing should be visible
    if (this.level === -999) return [];

    const byLevel =
      this.level === 999
        ? [...this.logs] // verbose - everything
        : this.logs.filter((e) => AppLog.#LEVEL_MAP[e.type] <= this.level); // normal - honour gate

    return type
      ? byLevel.filter((e) => e.type === type.toUpperCase()) // optional type filter on top
      : byLevel;
  }

  /** Clears all recorded log entries. */
  clear() {
    this.logs = [];
  }

  /**
   * Temporarily changes the log level, runs `fn`, then restores the original level.
   * Useful for scoping verbose output to a single block.
   * @param {number}   tempLevel
   * @param {Function} fn
   */
  withLevel(tempLevel, fn) {
    const prev = this.level;
    this.level = tempLevel;
    try {
      fn();
    } finally {
      this.level = prev;
    }
  }
}

module.exports = AppLog;