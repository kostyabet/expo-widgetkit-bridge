import ExpoModulesCore
import Foundation
#if canImport(WidgetKit)
import WidgetKit
#endif

public class ExpoWidgetkitBridgeModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoWidgetkitBridge")

    Function("reloadAllTimelines") {
      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
      }
    }

    Function("reloadTimelines") { (kind: String) in
      if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadTimelines(ofKind: kind)
      }
    }

    AsyncFunction("getCurrentConfigurations") { (promise: Promise) in
      if #available(iOS 14.0, *) {
        WidgetCenter.shared.getCurrentConfigurations { result in
          switch result {
          case .success(let infos):
            let payload: [[String: Any]] = infos.map { info in
              var family = "unknown"
              switch info.family {
              case .systemSmall: family = "systemSmall"
              case .systemMedium: family = "systemMedium"
              case .systemLarge: family = "systemLarge"
              default:
                if #available(iOS 15.0, *), info.family == .systemExtraLarge {
                  family = "systemExtraLarge"
                }
                if #available(iOS 16.0, *) {
                  switch info.family {
                  case .accessoryCircular: family = "accessoryCircular"
                  case .accessoryRectangular: family = "accessoryRectangular"
                  case .accessoryInline: family = "accessoryInline"
                  default: break
                  }
                }
              }
              return [
                "kind": info.kind,
                "family": family
              ]
            }
            promise.resolve(payload)
          case .failure(let error):
            promise.reject("ERR_WIDGET_CENTER", error.localizedDescription)
          }
        }
      } else {
        promise.resolve([])
      }
    }
  }
}
