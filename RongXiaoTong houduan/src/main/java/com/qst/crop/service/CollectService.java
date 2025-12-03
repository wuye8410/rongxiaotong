package com.qst.crop.service;

import com.qst.crop.entity.Collect;

public interface CollectService {
    // 添加收藏（返回是否成功，避免重复收藏）
    boolean addCollect(Collect collect);
    // 取消收藏
    boolean cancelCollect(String userName, Integer targetId, Integer type);
    // 检查是否收藏
    boolean checkCollect(String userName, Integer targetId, Integer type);
}