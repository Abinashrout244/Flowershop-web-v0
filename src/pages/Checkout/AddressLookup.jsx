import {
  AlertCircle,
  Clock3,
  Info,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const AddressLookup = ({
  value,
  onChange,
  onFocus,
  onBlur,
  searchingAddress,
  fetchingLocation,
  locationError,
  manualSuggestions,
  onSuggestionSelect,
  onSearch,
  onUseCurrentLocation,
  onClearHistory,
}) => {
  const isBusy = searchingAddress || fetchingLocation;

  return (
    <div className="md:col-span-2 space-y-2">
      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">
        Delivery Address
      </label>
      <div className="relative group">
        {isBusy && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-2xl z-20 animate-shimmer pointer-events-none" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a87c]/0 via-[#c9a87c]/5 to-[#c9a87c]/0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        <MapPin
          size={16}
          className={`absolute left-4 top-4 transition-all duration-300 ${
            isBusy ? "text-[#c9a87c] animate-bounce" : "text-gray-400 group-focus-within:text-[#c9a87c]"
          }`}
        />
        <input
          name="address"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={isBusy}
          placeholder="Type your area, street, or landmark"
          className={`relative w-full pl-11 pr-4 py-4 text-gray-900 bg-white/50 border border-gray-200/60 rounded-2xl text-sm focus:outline-none focus:border-[#c9a87c] focus:ring-4 focus:ring-[#c9a87c]/10 transition-all shadow-sm resize-none hover:bg-white/70 ${
            isBusy ? "opacity-70 cursor-not-allowed" : ""
          }`}
        />

        {isBusy && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 bg-[#c9a87c] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-1.5 h-1.5 bg-[#c9a87c] rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-1.5 h-1.5 bg-[#c9a87c] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
      </div>

      {(searchingAddress || fetchingLocation) && (
        <div className="rounded-2xl border border-gray-100 bg-white/80 px-4 py-3 text-[11px] text-gray-500 flex items-center gap-2">
          <Search size={12} className="text-[#c9a87c]" />
          {searchingAddress
            ? "Searching OpenStreetMap..."
            : "Getting your current location..."}
        </div>
      )}

      {manualSuggestions.length > 0 && (
        <div className="rounded-3xl border border-gray-200/60 bg-white/95 shadow-2xl shadow-gray-200/40 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            <Sparkles size={12} />
            Suggestions
          </div>
          <div className="max-h-64 overflow-auto">
            {manualSuggestions.map((suggestion, index) =>
              suggestion.type === "search" ? (
                <button
                  key={`search-${suggestion.address}`}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={onSearch}
                  className="w-full px-4 py-3 text-left hover:bg-[#faf7f1] transition-colors flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-[#fdf8f0] flex items-center justify-center text-[#c9a87c] flex-shrink-0">
                    <Search size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {suggestion.label}
                    </p>
                    <p className="text-[11px] text-gray-400">{suggestion.hint}</p>
                  </div>
                </button>
              ) : (
                <button
                  key={`${suggestion.address}-${index}`}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSuggestionSelect(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-[#faf7f1] transition-colors flex items-start gap-3 border-t border-gray-50 first:border-t-0"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                    <Clock3 size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                      {suggestion.address}
                    </p>
                    <p className="text-[11px] text-gray-400 line-clamp-1">
                      {[suggestion.city, suggestion.state, suggestion.pincode]
                        .filter(Boolean)
                        .join(" • ")}
                    </p>
                  </div>
                </button>
              ),
            )}
          </div>
          <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
            <span>Choose a recent address or search the typed text</span>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={onClearHistory}
              className="inline-flex items-center gap-1 hover:text-gray-700"
            >
              <X size={10} />
              Clear
            </button>
          </div>
        </div>
      )}

      {locationError && (
        <div className="flex items-start gap-2 p-3 bg-red-50/50 rounded-lg border border-red-200/50 backdrop-blur-sm animate-in">
          <AlertCircle size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-[10px] text-red-600 font-medium">{locationError}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onSearch}
          disabled={isBusy}
          className="relative text-[11px] font-bold text-white bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2.5 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-500 ${
              searchingAddress ? "animate-pulse" : ""
            }`}
          />
          <span className="relative flex items-center gap-2">
            {searchingAddress ? (
              <>
                <div className="w-3 h-3 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search size={14} />
                Find Address
              </>
            )}
          </span>
        </button>
        <button
          onClick={onUseCurrentLocation}
          disabled={isBusy}
          className={`relative overflow-hidden text-[11px] font-bold text-[#c9a87c] flex items-center gap-2 hover:opacity-70 transition-all group rounded-full px-3 py-2 ${
            isBusy ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {fetchingLocation && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#c9a87c]/0 via-[#c9a87c]/10 to-[#c9a87c]/0 animate-pulse" />
          )}
          <div
            className={`relative w-4 h-4 rounded-full border-2 border-[#c9a87c] flex items-center justify-center transition-all ${
              fetchingLocation ? "animate-spin border-t-transparent" : "group-hover:bg-[#c9a87c]/5"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 bg-[#c9a87c] rounded-full ${
                fetchingLocation ? "opacity-0" : "group-hover:animate-pulse"
              }`}
            />
          </div>
          <span className="relative">
            {fetchingLocation ? "Getting Location..." : "Use Current Location"}
          </span>
        </button>
      </div>

      <p className="text-[10px] text-gray-400 ml-1 flex items-center gap-1.5">
        <Info size={12} className="opacity-60" />
        Address search powered by OpenStreetMap Nominatim.
      </p>
    </div>
  );
};

export default AddressLookup;
